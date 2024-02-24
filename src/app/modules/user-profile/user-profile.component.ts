import { ChangeDetectorRef, Component, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { TranslationAlignmentService } from 'src/app/app-services/translation-alignment.service';
import { ApplicantDataService } from '../applicant-portal/services/applicant-shared.service';
import { DomSanitizer } from '@angular/platform-browser';
import { LinkedInService } from '../applicant-portal/services/linkedin.service';
import { AppLookUpService } from 'src/app/app-services/app-look-up.service';
import { userApplicantImage } from 'src/app/models/userImageParameters';
import { UpdateAboutMe } from 'src/app/models/update-about-me.model';
import { SharedService } from 'src/app/shared/services/shared.service';
import { CompetenciesCommonService } from '../competencies-common/components/services/competencies-common.service';
import { ToastrService } from 'ngx-toastr';
import { DeleteModalComponentService } from 'src/app/shared/delete-modal/delete-modal.service';


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
	competencyIndex: number = 1;
	imageAvatar: any;
	defaultUrl: string = 'assets/Images/default-image.png';
	fileList: any[] = [];
	fileData: any;
	public isTranslate: boolean = this.translationService.isTranslate;
	aboutMe: string = '';
	aboutMeDisablitiy: boolean = true
	fileCvData: any;
	uploadCvData: UploadCvsDTO[] = [];
	isActive:number = 2;
	constructor(
		private router: Router,
		public ref: ChangeDetectorRef,
		private el: ElementRef,
		public applicantDataService: ApplicantDataService,
		private _sanitizer: DomSanitizer,
		public translationService: TranslationAlignmentService,
		public linkedInServive: LinkedInService,
		private lookUpService: AppLookUpService,
		public shareService: SharedService,
        public competencies: CompetenciesCommonService,
		public toastrService: ToastrService,
		private deleteModal: DeleteModalComponentService
	) {
		this.translationService.languageChange.subscribe(x => {
			{
				this.isTranslate = x;
			}
		});
	}

	async ngOnInit() {
		this.isActive = this.applicantDataService?.applicantData?.ApplicationStatus;
		if (this.applicantDataService.applicantData?.applicantImage != undefined && this.applicantDataService?.applicantData?.applicantImage != "") {
			this.applicantDataService.applicantImage = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
				+ this.applicantDataService?.applicantData?.applicantImage);
		}
		// if (this.applicantDataService?.applicantData?.cvAttachment) {
		// 	this.applicantDataService.applicantData.cvAttachment = this._sanitizer.bypassSecurityTrustResourceUrl('data:file/pdf;base64,'
		// 		+ this.applicantDataService?.applicantData?.cvAttachment);
		// 		let blob = this.b64toBlob(this.applicantDataService?.applicantData?.cvAttachment, "application/pdf");
				
		// }
		
		if (this.applicantDataService.applicantData?.aboutMe) {
			this.aboutMe = this.applicantDataService?.applicantData?.aboutMe;
		}
		if (this.competencies?.skillsList?.length == 0) {
			await this.shareService.GetLookUps();
		}
	}
	public b64toBlob(b64Data:string, contentType:string) {
		contentType = contentType || '';
		let sliceSize = 512;
	  
		var byteCharacters = atob(b64Data);
		var byteArrays = [];
	  
		for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
			var slice = byteCharacters.slice(offset, offset + sliceSize);
	  
			var byteNumbers = new Array(slice.length);
			for (var i = 0; i < slice.length; i++) {
				byteNumbers[i] = slice.charCodeAt(i);
			}
	  
			var byteArray = new Uint8Array(byteNumbers);
	  
			byteArrays.push(byteArray);
		}
	  
		var blob = new Blob(byteArrays, { type: contentType });
		return blob;
	  }
	OpenSidenav() {
		this.sidenavOpen = true;
	}
	CloseSidenav() {
		this.sidenavOpen = false;
	}
	RouteToProfile() {
		this.router.navigate(['/profile']);
	}
	RouteToCompetencies() {
		this.router.navigate(['/competencies']);
	}
	async selectFile(event: any) {
		if (event.target.files[0].type == 'image/jpeg' || event.target.files[0].type == 'image/png') {
			this.fileData = event.target.files[0];
			const reader = new FileReader();
			reader.readAsDataURL(this.fileData);
			reader.onload = async () => {
				this.imageAvatar = reader.result;
				let applicantImageParameters: userApplicantImage = {
					applicantImage: this.imageAvatar.substring(this.imageAvatar.indexOf('base64,') + 7, this.imageAvatar.length),
					applicantId: localStorage.getItem('applicantId') ?? ''
				}
				let res = await this.lookUpService.UploadApplicantImage(applicantImageParameters);
				if (res.Status) {
					this.applicantDataService.applicantImage = this.imageAvatar;
					await this.applicantDataService.GetUserInfo();
				}
			};
		} else {
			alert("file type should be image of jpeg or png")
			return;
		}
	}
	

	DeleteFile(index: number) {
		const data = `Are you sure you want to do remove this cv?`;
		const dialogRef = this.deleteModal.openDialog(data);
		dialogRef.afterClosed().subscribe(async (dialogResult: any) => {
		if (dialogResult) {
			this.fileList.splice(index, 1);
			this.uploadCvData.splice(index, 1);
		}
	});
  }

	removeAvtar() {
		this.imageAvatar = this.defaultUrl;
	}

	uploadCV(files: any) {
		if (files.target.files.length > 0) {
			  this.fileCvData = files.target.files[0];
			  const reader = new FileReader();
			  reader.readAsDataURL(this.fileCvData);
			  reader.onload = () => {
				let cvData: any = reader.result;
				let uploadCVs = new UploadCvsDTO();
				uploadCVs.applicantId = localStorage.getItem('applicantId') ?? '',
				uploadCVs.cvAttachment = cvData.substring(cvData.indexOf('base64,') + 7, cvData.length);
				uploadCVs.fileName = this.fileCvData.name;
				this.uploadCvData.push(uploadCVs);
			  };
		}
		this.fileList.push(files.target.files[0]);
		this.ref.detectChanges();
	}
	ScrollToTarget(event: any) {
		const targetElement = this.el.nativeElement.querySelector(event);
		if (targetElement) {
			targetElement.scrollIntoView({ behavior: 'smooth' });
		}
	}
	async UpdateAboutme() {
		let aboutMeData: UpdateAboutMe = {
			applicantId: localStorage.getItem('applicantId') ?? '',
			applicantPersonRecid: Number(localStorage.getItem('applicantPersonRecid')) ?? 0,
			aboutMe: this.aboutMe
		}
		let res = await this.lookUpService.UpdateAboutme(aboutMeData);
		if (res.Status) {
			await this.applicantDataService.GetUserInfo();
		}
	}
	GetProfileTabIndex(event: any) {
		this.index = event;
	}
	GetCompetencyTabIndex(event: any) {
		this.competencyIndex = event;
	}
	Next() {
		if (this.index === 1) {
			this.index = 2;
		} else if (this.index === 2) {
			this.index = 3;
		} else if (this.index === 3) {
			this.index = 4;
		}
	}
	Back(index: Number) {
		if (index === 2) {
			this.index = 1;
		} else if (index === 3) {
			this.index = 2;
		} else if (index === 4) {

			this.index = 3;
		}
	}
	DiscardData() {
		this.shareService.discardProfileInfo.emit(true);
	}
	NextCompetency() {
		if (this.competencyIndex === 1) {

			this.competencyIndex = 2;
		} else if (this.competencyIndex === 2) {

			this.competencyIndex = 3;
		} else if (this.competencyIndex === 3) {

			this.competencyIndex = 4;
		} else if (this.competencyIndex === 4) {

			this.competencyIndex = 5;
		} else if (this.competencyIndex === 5) {

			this.competencyIndex = 6;
		}
	}
	PrevCompetency(index: Number) {
		if (index === 2) {

			this.competencyIndex = 1;
		} else if (index === 3) {

			this.competencyIndex = 2;
		} else if (index === 4) {

			this.competencyIndex = 3;
		} else if (this.index === 5) {

			this.competencyIndex = 4;
		} else if (this.index === 6) {

			this.competencyIndex = 5;
		}
	}
	toggleEditor() {
		this.aboutMeDisablitiy = !this.aboutMeDisablitiy;
	}

	async uploadCvs() {
		let res = await this.lookUpService.uploadCvs(this.uploadCvData);
		if (res != null && res?.length > 0) {
			this.toastrService.success("Files are uploaded");
		} else {
			this.toastrService.error(res)
		}
	}

}


export class UploadCvsDTO {
	applicantId: string = ''
	cvAttachment: string = '';
	fileName: string = '';
}


export class UploadMedicalDTO {
	applicantId: string = ''
	attachment: string = '';
	fileName: string = '';
	_imageBase64: string = '';
}