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
	constructor(
		private router: Router,
		public ref: ChangeDetectorRef,
		private renderer: Renderer2,
		private el: ElementRef,
		public applicantDataService: ApplicantDataService,
		private _sanitizer: DomSanitizer,
		public translationService: TranslationAlignmentService,
		public linkedInServive: LinkedInService,
		private lookUpService: AppLookUpService,
		public shareService: SharedService,
        public competencies: CompetenciesCommonService
	) {
		this.translationService.languageChange.subscribe(x => {
			{
				this.isTranslate = x;
			}
		});
	}

	async ngOnInit() {
		if (this.applicantDataService.applicantData?.applicantImage != undefined && this.applicantDataService.applicantData?.applicantImage != "") {
			this.applicantDataService.applicantImage = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
				+ this.applicantDataService.applicantData?.applicantImage);
		}
		if (this.applicantDataService.applicantData?.aboutMe) {
			this.aboutMe = this.applicantDataService.applicantData.aboutMe;
		}
		if (this.competencies.skillsList.length == 0) {
			await this.shareService.GetLookUps();
		}
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

	DeleteFile(file: any) {
		this.fileList = [];
	}

	removeAvtar() {
		this.imageAvatar = this.defaultUrl;
	}

	uploadCV(files: any) {
		;
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
}
