import { ChangeDetectorRef, Component, inject, Input, OnInit } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AppLookUpService } from 'src/app/app-services/app-look-up.service';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ApplicantDataService } from 'src/app/modules/applicant-portal/services/applicant-shared.service';
import { LinkedInService } from 'src/app/modules/applicant-portal/services/linkedin.service';
import { UserInfoService } from 'src/app/modules/user-info/user-info.service';
import { forkJoin } from 'rxjs';
import { LookupParameters } from 'src/app/models/look-up.model';
import { TranslationAlignmentService } from 'src/app/app-services/translation-alignment.service';


@Component({
  selector: 'app-add-edit-basicinformation',
  templateUrl: './add-edit-basicinformation.component.html',
  styleUrls: ['./add-edit-basicinformation.component.scss']
})
export class AddEditBasicinformationComponent implements OnInit {
  private _applicantFormBuilder = inject(UntypedFormBuilder);
  defaultUrl:string = '../assets/Images/Profile.png';
  public completed: boolean = true;
  public sidenavOpen: boolean = false;
  title = 'angular';
  public Editor = ClassicEditor;
  applicantForm!: UntypedFormGroup;
  imagePathOrBase64: any;
  imageAvatar:any;
  fileList:any[] = [];
  @Input() isUserProfile : boolean = false;
  nativeLanguage: any[] = [];
  highestDegree: any[] = [];
  get f() { return this.applicantForm.controls; }
  constructor(public userInfoService: UserInfoService,
    private lookUpService: AppLookUpService,
    public ref: ChangeDetectorRef,
    private toasterService: ToastrService,
    private applicantDataService: ApplicantDataService,
    private _sanitizer: DomSanitizer,
    public linkedInServive: LinkedInService,
    public shareService: SharedService,
    public translationService: TranslationAlignmentService) {
      this.translationService.languageChange.subscribe( x=> {
        this.ArabicList();
      });
    this.applicantForm = this._applicantFormBuilder.group({
      currentJobTitle: [''],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      firstNameAr:[''],
      lastNameAr:[''],
      middleName: [''],
      maritalStatus: ['0', [Validators.required]],
      birthDate: ['',[Validators.required]],
      highestDegree: ['', [Validators.required]],
      currentSalary: [''],
      reasonCode: [''],
      previousEmployee: ['0'],
      gender: ['0', [Validators.required]],
      nationality: ['', [Validators.required]],
      nativeLanguageId: ['', [Validators.required]],
      ethnicOriginId: ['']
    });
  }

  async ngOnInit() {
    this.ArabicList();
    await this.userInfoService.GetApplicantProfile();
    this.applicantForm.patchValue({
      ...this.userInfoService.basicInfo,
      gender: this.userInfoService.basicInfo?.gender?.toString(),
      maritalStatus: this.userInfoService.basicInfo?.maritalStatus?.toString(),
      previousEmployee: this.userInfoService.basicInfo?.previousEmployee?.toString()
    })
    if (this.applicantDataService.applicantData?.applicantImage != undefined && this.applicantDataService.applicantData?.applicantImage != "") {
      this.imagePathOrBase64 = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
        + this.applicantDataService.applicantData?.applicantImage);
    }
    this.shareService.discardProfileInfo.subscribe(x => {
      this.applicantForm.reset();
    });
  }

  OpenSidenav() {
    this.sidenavOpen = true;
    document.body.style.overflow = 'hidden';
  }

  CloseSidenav() {
    this.sidenavOpen = false;
    document.body.style.overflow = 'auto';
  }

  async SaveChanges() {
    if (this.applicantForm?.valid) {
      let profileData: any = {
        ...this.applicantForm.value,
        gender: Number(this.applicantForm?.controls?.gender.value),
        maritalStatus: Number(this.applicantForm?.controls?.maritalStatus?.value),
        previousEmployee: Number(this.applicantForm?.controls?.previousEmployee?.value) ?? 0,
        recid: this.userInfoService?.basicInfo?.recid ? this.userInfoService?.basicInfo?.recid : 0
      }
      try {
        let response = await this.lookUpService.UpdateApplicantProfileGeneral(profileData);
        if (response?.Status) {
          await this.userInfoService.GetApplicantProfile();
          this.toasterService.success(response?.Message);
        } else {
          this.toasterService.error(response?.Message);
        }
      } catch (ex) {
        console.error();
      }
    }else{
      this.applicantForm.markAllAsTouched();
    }
  }
  uploadCV(files: any) {;
		this.fileList.push(files.target.files[0]);
		this.ref.detectChanges();
	}
  DeleteFile(file:any) {
		this.fileList = [];
	}
  selectFile(event:any) {
		const reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
      	reader.onload = (event) => {
        	this.imageAvatar = event?.target?.result;
		}
 	}
   removeAvtar() {
		this.imageAvatar = this.defaultUrl;
	}
  ArabicList() {
    if (this.translationService.isTranslate) {
      this.nativeLanguage = this.userInfoService.nativeLanguageArabic;
      this.highestDegree = this.userInfoService.highestDegreeArabic;
    } else {
      this.nativeLanguage = this.userInfoService.nativeLanguage;
      this.highestDegree = this.userInfoService.highestDegree;
    } 
  }
}
