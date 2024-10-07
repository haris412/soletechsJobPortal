import { ChangeDetectorRef, Component, inject, Input, OnInit } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AppLookUpService } from 'src/app/app-services/app-look-up.service';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ApplicantDataService } from 'src/app/modules/applicant-portal/services/applicant-shared.service';
import { LinkedInService } from 'src/app/modules/applicant-portal/services/linkedin.service';
import { UserInfoService } from 'src/app/modules/user-info/user-info.service';
import { map, Observable, startWith } from 'rxjs';
import { TranslationAlignmentService } from 'src/app/app-services/translation-alignment.service';
import { LookupParameters } from 'src/app/models/look-up.model';
import { LookUpDto } from 'src/app/models/lookup-dto.model';


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
  selectedNationality:string = '';
  fileList:any[] = [];
  @Input() isUserProfile : boolean = false;
  nativeLanguage: LookUpDto[] = [];
  highestDegree: LookUpDto[] = [];
  nationalityData!: Observable<any[]>;
  nationalityCtrl = new FormControl('');
  maritalStatusList:LookUpDto[] = [];
  genderList:LookUpDto[] = [];
  previousEmployeeList:LookUpDto[] = [];
  public isTranslate: boolean = this.translationService.isTranslate;
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
    this.applicantForm = this._applicantFormBuilder.group({
      currentJobTitle: [''],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      firstNameAr:[''],
      lastNameAr:[''],
      middleName: [''],
      middleNameAr: [''],
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
    this.translationService.languageChange.subscribe( x=> {
      this.translationService.isTranslate  = x;
      this.isTranslate = x;
      this.ArabicList();
    });
  }

  async ngOnInit() {
    if (this.userInfoService?.identificationList?.parmApplicantProfileIdentificationList == undefined || this.userInfoService?.identificationList?.parmApplicantProfileIdentificationList.length == 0) {
      await this.userInfoService.GetApplicantProfile();
    }
    this.applicantForm.patchValue({
      ...this.userInfoService.basicInfo,
      gender: this.userInfoService.basicInfo?.gender?.toString(),
      maritalStatus: this.userInfoService.basicInfo?.maritalStatus?.toString(),
      previousEmployee: this.userInfoService.basicInfo?.previousEmployee?.toString()
    });
    this.ArabicList();
    if (this.applicantDataService.applicantData?.applicantImage != undefined && this.applicantDataService.applicantData?.applicantImage != "") {
      this.imagePathOrBase64 = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
        + this.applicantDataService.applicantData?.applicantImage);
    }
    this.shareService.discardProfileInfo.subscribe(x => {
      this.applicantForm.reset();
    });
    this.SetNationalityValue();
    this.nationalityData = this.nationalityCtrl.valueChanges.pipe(
      startWith(''),
      map(value => this.__filterCountries(value || '')),
    );
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
        nationality : this.selectedNationality,
        gender: Number(this.applicantForm?.controls?.gender.value),
        maritalStatus: Number(this.applicantForm?.controls?.maritalStatus?.value),
        previousEmployee: Number(this.applicantForm?.controls?.previousEmployee?.value) ?? 0,
        recid: this.userInfoService?.basicInfo?.recid ? this.userInfoService?.basicInfo?.recid : 0
      }
      try {
        if (profileData.birthDate != undefined && profileData.birthDate != null) {
            const date1 = new Date(profileData.birthDate);
            const date2 = new Date(this.userInfoService.basicInfo.birthDate);
          if (profileData && profileData.birthDate) {
            // Parse the birthDate string into a JavaScript Date object
            const originalDate = new Date(profileData.birthDate);
            // Check if originalDate is a valid Date object
            if (!isNaN(originalDate.getTime()) && (date1?.toISOString() !== date2?.toISOString())) {
                // Add one day to the date
                originalDate.setDate(originalDate.getDate() + 1);
                profileData.birthDate = originalDate.toISOString();
            }
          }
        }
        let response = await this.lookUpService.UpdateApplicantProfileGeneral(profileData);
        if (response?.Status) {
          await this.userInfoService.GetApplicantProfile();
          this.toasterService.success(response?.Message);
        } else {
          this.toasterService.error(response?.Message);
        }
      } catch (ex) {
        console.log(ex)
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
  async ArabicList() {
    if (this.translationService.isTranslate) {
      this.nativeLanguage = this.userInfoService.nativeLanguageArabic;
      this.highestDegree = this.userInfoService.highestDegreeArabic;
      this.maritalStatusList = this.userInfoService.maritalStatusListArabic;
      this.genderList = this.userInfoService.genderListArabic;
      this.previousEmployeeList = this.userInfoService.previousEmployerListArabic;
      let countryParams:LookupParameters = {
        dataAreaId: 'USMF',
        languageId:  'ar' 
      }
      let response = await this.lookUpService.GetCountryRegionLookup(countryParams);
      this.userInfoService.countryRegions = [];
      response?.parmList?.forEach((projects: any) => {
        let data = new Object() as any;
        data.name = projects.Description;
        data.value = projects.Id;
        this.userInfoService.countryRegions.push(data);
      });
    } else {
      this.nativeLanguage = this.userInfoService.nativeLanguage;
      this.highestDegree = this.userInfoService.highestDegree;
      this.maritalStatusList = this.userInfoService.maritalStatusList;
      this.genderList = this.userInfoService.gendersList;
      this.previousEmployeeList = this.userInfoService.previousEmployerList;
      let countryParams:LookupParameters = {
        dataAreaId: 'USMF',
        languageId: 'en-us'
      }
      let response = await this.lookUpService.GetCountryRegionLookup(countryParams);
      this.userInfoService.countryRegions = [];
      response?.parmList?.forEach((projects: any) => {
        let data = new Object() as any;
        data.name = projects.Description;
        data.value = projects.Id;
        this.userInfoService.countryRegions.push(data);
      });
    } 
    this.nationalityData = this.nationalityCtrl.valueChanges.pipe(
      startWith(''),
      map(value => this.__filterCountries(value || '')),
    ); 
    this.SetNationalityValue();
  }
  private __filterCountries(value: string): string[] {
    const filterValue = value?.toLowerCase();
    return this.userInfoService.countryRegions?.filter(countries => countries?.name?.toLowerCase()?.includes(filterValue));
  }
  OnNationlaityChange(event:any){
    let filteredCountry = this.userInfoService.countryRegions?.find(countries => countries?.value === event?.source.value);
    this.nationalityCtrl.setValue(filteredCountry.name);
    this.applicantForm?.controls?.nationality.setValue(filteredCountry.name ?? "");
    this.selectedNationality = filteredCountry.value;
  }

  SetNationalityValue(){
    let filteredCountry = this.userInfoService.countryRegions?.find(countries => countries?.value === this.userInfoService.basicInfo.nationality);
    if (filteredCountry) {
      this.selectedNationality = filteredCountry?.value;
      this.nationalityCtrl.setValue(filteredCountry.name);
    }
  }
}
