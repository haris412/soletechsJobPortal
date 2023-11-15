import { Injectable } from "@angular/core";
import { UntypedFormGroup } from "@angular/forms";
import { Applicant } from "src/app/models/applicant";

@Injectable({
    providedIn: 'root',
})
export class UserInfoService {

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
}