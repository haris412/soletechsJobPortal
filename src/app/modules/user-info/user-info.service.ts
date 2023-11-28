import { Injectable, inject } from "@angular/core";
import { FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Contact } from "src/app/app-enums/app-enums";
import { AppLookUpService } from "src/app/app-services/app-look-up.service";
import { Applicant } from "src/app/models/applicant";
import { ContactInfo } from "src/app/models/contact-info.model";

@Injectable({
    providedIn: 'root',
})
export class UserInfoService {

	constructor(public lookupService: AppLookUpService) {}

    private _applicantFormBuilder = inject(UntypedFormBuilder);

    applicant: Applicant = new Applicant();
    applicantForm!: UntypedFormGroup;
    // Lookups
    countryRegions: any[] = [];
    cities: any[] = [];
    ethnic: any[] = [];
    nativeLanguage: any[] = [];
    highestDegree: any[] = [];
    reasonCodes: any[] = [];
    identificationType: any[] = [];
    nationality:any[] = [];
	contactsList:any[] = [];
	addressList:any[] = [];
	identificationList:any;
	basicInfo:any;
	selectedContact!: ContactInfo;
    prepareApplicantFormGroup() {
		this.applicantForm = this._applicantFormBuilder.group({
			currentJobTitle: ['',[Validators.required]],
			firstName:['', [Validators.required]],
			lastName:['', [Validators.required]],
			middleName:['', [Validators.required]],
			maritalStatus:['', [Validators.required]],
			birthDate:[''],
			highestDegree:['', [Validators.required]],
			currentSalary:[''],
			reasonCode:[''],
			gender:['', [Validators.required]],
			nationality:['', [Validators.required]],
			nativeLanguageId:['', [Validators.required]],
			ethnicOriginId:['', [Validators.required]]
		});
		this.applicantForm = this.applicantForm;
    }
	
	async GetApplicantProfile(){
		let applicantId = localStorage.getItem('applicantId') ?? '';
		let res = await this.lookupService.GetApplicantProfile(applicantId);
		if(res){
		   this.basicInfo = res?.ApplicantProfileGeneral;
		   this.contactsList= res?.ApplicantProfileContactList?.parmApplicantProfileContactList;
		   this.addressList = res?.ApplicantProfileAddressList?.parmApplicantProfileAddressList;
		   this.identificationList = res?.ApplicantProfileIdentification;
		}
	  }
}