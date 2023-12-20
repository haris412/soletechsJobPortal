import { ChangeDetectorRef, Component, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { TranslationAlignmentService } from 'src/app/app-services/translation-alignment.service';
import { ApplicantDataService } from '../applicant-portal/services/applicant-shared.service';
import { DomSanitizer } from '@angular/platform-browser';
import { LinkedInService } from '../applicant-portal/services/linkedin.service';
import { AppLookUpService } from 'src/app/app-services/app-look-up.service';
import { userApplicantImage } from 'src/app/models/userImageParameters';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
  public completed: boolean = true;
	public sidenavOpen: boolean = false;
	title = 'angular';
	public Editor = ClassicEditor;
	index: Number = 1;
  imageAvatar:any;
	defaultUrl:string = 'assets/Images/Profile.png';
	fileList:any[] = [];
	imagePathOrBase64: any;
	fileData:any;
	public isTranslate: boolean = this.translationService.isTranslate;
	constructor(
		private router: Router, 
		public ref: ChangeDetectorRef,
		private renderer: Renderer2, 
		private el: ElementRef,
		private applicantDataService: ApplicantDataService,
		private _sanitizer: DomSanitizer,
		public translationService: TranslationAlignmentService,
		public linkedInServive: LinkedInService,
		private lookUpService: AppLookUpService,
		) {
			this.translationService.languageChange.subscribe(x=>{{
        this.isTranslate=x;
      }});
		 }

	ngOnInit(): void {
	if (this.applicantDataService.applicantData?.applicantImage != undefined && this.applicantDataService.applicantData?.applicantImage != "") {
		this.imagePathOrBase64 = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
			+ this.applicantDataService.applicantData?.applicantImage);
		}
	}

	OpenSidenav() {
		this.sidenavOpen = true;
	}

	CloseSidenav() {
		this.sidenavOpen = false;
	}

	Next() {
		if (this.index === 1) {
			this.index = 2;
		} else if (this.index === 2) {
			this.index = 3;
		} else if (this.index === 3) {
			this.index = 4;
		} else if (this.index === 4) {
			this.index = 5;
		} else if (this.index === 5) {
			this.index = 6;
		}
	}
	Back(index: Number) {

	}
	RouteToProfile() {
		this.router.navigate(['/profile']);
	}
	RouteToCompetencies() {
		this.router.navigate(['/competencies']);
	}
	async selectFile(event:any) {
		// const reader = new FileReader();
		// reader.readAsDataURL(event.target.files[0]);
      	// reader.onload = (event) => {
        // 	this.imageAvatar = event?.target?.result;
		// }
		if (event.target.files[0].type == 'image/jpeg' || event.target.files[0].type == 'image/png') {
			this.fileData = event.target.files[0];
			const reader = new FileReader();
			reader.readAsDataURL(this.fileData);
			reader.onload = () => {
				this.imageAvatar = reader.result;
				// this.userForm.controls.applicantImage.setValue(this.imageAvatar.substring(this.imageAvatar.indexOf('base64,') + 7, this.imageAvatar.length));
			};
			let applicantImageParameters:userApplicantImage = {
				applicantImage:this.imageAvatar.substring(this.imageAvatar.indexOf('base64,') + 7, this.imageAvatar.length),
				applicantId:localStorage.getItem('applicantId') ?? ''
			}
			let res = await this.lookUpService.UploadApplicantImage(applicantImageParameters);
			if(res){
				console.log(res);
			}
		} else {
			alert("file type should be image of jpeg or png")
			return;
		}
 	}

	DeleteFile(file:any) {
		this.fileList = [];
	}

	removeAvtar() {
		this.imageAvatar = this.defaultUrl;
	}

	uploadCV(files: any) {;
		this.fileList.push(files.target.files[0]);
		this.ref.detectChanges();
	}
	ScrollToTarget(event: any) {
    const targetElement = this.el.nativeElement.querySelector(event);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
