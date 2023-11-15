import { Injectable, inject } from "@angular/core";
import { FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Applicant } from "src/app/models/applicant";

@Injectable({
    providedIn: 'root',
})
export class UserInfoService {
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
}