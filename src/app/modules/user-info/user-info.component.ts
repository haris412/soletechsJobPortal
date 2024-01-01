import { Location } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { forkJoin } from 'rxjs';
import { AppLookUpService } from 'src/app/app-services/app-look-up.service';
import { LookupParameters } from 'src/app/models/look-up.model';
import { UserInfoService } from './user-info.service';
import { TranslationAlignmentService } from 'src/app/app-services/translation-alignment.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
	selector: 'app-user-info',
	templateUrl: './user-info.component.html',
	styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
	public completed: boolean = false;
	public sidenavOpen: boolean = false;
	public isActive: boolean = false;
	public isBasicActive: boolean = true;
	public isContactActive: boolean = false;
	public isAddressActive: boolean = false;
	public isIdentificationActive: boolean = false;
	public basicCompleted: boolean = false;
	public contactCompleted: boolean = false;
	public addressCompleted: boolean = false;
	public identificationCompleted: boolean = false;
	public isTranslate: boolean = this.translationService.isTranslate;

	title = 'soletech';
	public Editor = ClassicEditor;
	index: Number = 0;
	stepperTitle: string = 'Basic Info';
	@Input() isUserProfile: boolean = true;

	constructor(private location: Location
		, private lookUpService: AppLookUpService
		, private userInfoService: UserInfoService
		, public translationService: TranslationAlignmentService
		, public shareService: SharedService
	) {

		if (this.userInfoService.applicantForm == undefined) {
			this.userInfoService.prepareApplicantFormGroup();
		}
		this.translationService.languageChange.subscribe(x => {
			{
				this.isTranslate = x;
			}
		});
	}

	async ngOnInit() {
		await this.GetLookups();
		await this.userInfoService.GetApplicantProfile();
		this.index = 1;
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
			this.stepperTitle = 'Contact';
			this.isBasicActive = false;
			this.isContactActive = true;
			this.isAddressActive = false;
			this.isIdentificationActive = false;
		} else if (this.index === 2) {
			this.index = 3;
			this.stepperTitle = 'Address';
			this.isBasicActive = false;
			this.isContactActive = false;
			this.isAddressActive = true;
			this.isIdentificationActive = false;
		} else if (this.index === 3) {
			this.stepperTitle = 'Identification';
			this.index = 4;
			this.isBasicActive = false;
			this.isContactActive = false;
			this.isAddressActive = false;
			this.isIdentificationActive = true;
		}
	}
	Back(index: Number) {
		if (index === 2) {
			this.stepperTitle = 'Basic Info';
			this.index = 1;
			this.isBasicActive = true;
			this.isContactActive = false;
			this.isAddressActive = false;
			this.isIdentificationActive = false;
		} else if (index === 3) {
			this.stepperTitle = 'Contact';
			this.index = 2;
			this.isBasicActive = false;
			this.isContactActive = true;
			this.isAddressActive = false;
			this.isIdentificationActive = false;
		} else if (index === 4) {
			this.stepperTitle = 'Address';
			this.index = 3;
			this.isBasicActive = false;
			this.isContactActive = false;
			this.isAddressActive = true;
			this.isIdentificationActive = false;
		}
	}
	GoBack() {
		this.location.back();
	}
	GoToTab(index: number) {
		this.index = index;
		if (index === 2) {
			this.isBasicActive = false;
			this.isContactActive = true;
			this.isAddressActive = false;
			this.isIdentificationActive = false;
		} else if (index === 3) {
			this.isBasicActive = false;
			this.isContactActive = false;
			this.isAddressActive = true;
			this.isIdentificationActive = false;
		} else if (index === 4) {
			this.isBasicActive = false;
			this.isContactActive = false;
			this.isAddressActive = false;
			this.isIdentificationActive = true;
		} else if (index === 1) {
			this.isBasicActive = true;
			this.isContactActive = false;
			this.isAddressActive = false;
			this.isIdentificationActive = false;
		}
	}

	async GetLookups() {
		let params: LookupParameters = {
			dataAreaId: 'USMF',
			languageId: 'en-us'
		}
		const lookUps = await forkJoin({
			countries: this.lookUpService.GetCountryRegionLookup(params),
			ethnic: this.lookUpService.GetEthnicOriginLookup(params),
			nativeLanguage: this.lookUpService.GetNativeLanguageCodeLookup(params),
			highestDegree: this.lookUpService.GetHighestDegreeLookups(params),
			reasonCodes: this.lookUpService.GetReasonCodeLookups(params),
			identificationType: this.lookUpService.GetIdentificationTypeLookup(params),
		}).toPromise();
		lookUps?.countries?.parmList?.forEach((projects: any) => {
			let data = new Object() as any;
			data.name = projects.Description;
			data.value = projects.Id;
			this.userInfoService.countryRegions.push(data);
		}
		);
		lookUps?.ethnic?.parmList?.forEach((projects: any) => {
			let data = new Object() as any;
			data.name = projects.Description;
			data.value = projects.Id;
			this.userInfoService.ethnic.push(data);
		}
		);
		lookUps?.nativeLanguage?.parmList?.forEach((projects: any) => {
			let data = new Object() as any;
			data.name = projects.Description;
			data.value = projects.Id;
			this.userInfoService.nativeLanguage.push(data);
		}
		);
		lookUps?.highestDegree?.parmList?.forEach((projects: any) => {
			let data = new Object() as any;
			data.name = projects.Description;
			data.value = projects.Id;
			this.userInfoService.highestDegree.push(data);
		}
		);
		lookUps?.reasonCodes?.parmList?.forEach((projects: any) => {
			let data = new Object() as any;
			data.name = projects.Description;
			data.value = projects.Id;
			this.userInfoService.reasonCodes.push(data);
		}
		);
		lookUps?.identificationType?.parmList?.forEach((projects: any) => {
			let data = new Object() as any;
			data.name = projects.Description;
			data.value = projects.Id;
			this.userInfoService.identificationType.push(data);
		}
		);
	}

	DiscardData() {
		this.shareService.discardProfileInfo.emit(true);
	}
}
