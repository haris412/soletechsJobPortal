import { EventEmitter, Injectable } from '@angular/core';
import { SavedJobs } from '../models/savedJobs';
import { AppLookUpService } from 'src/app/app-services/app-look-up.service';

@Injectable({
  providedIn: 'root',
})
export class ApplicantDataService {
    loginEmitter:EventEmitter<boolean> = new EventEmitter();
    signUpModalEmitter:EventEmitter<boolean> = new EventEmitter();

    isLogin:boolean = false;
    selectedJob:any;
    savedJobs: any[] = [];
    public applicantData:any;
    public selectedSavedJob: any;
    public applicantImage: any;

    constructor(public lookupService: AppLookUpService) {}

    SetJob(job:any){
      this.selectedJob = job;
    }
    GetJob(){
      return this.selectedJob;
    }
    SetApplicantInfo(applicantInfo:any){
      this.applicantData = applicantInfo;
      this.loginEmitter.emit(true);
    }
    GetApplicantInfo(){
      return this.applicantData;
    }
    isJobAlreadySaved(job: any) {
      return this.savedJobs?.find(x => x.recruitingId == job.recruitingId) != undefined;
    }

    async GetApplicantSavedJobsList(){
      let applicantId = localStorage.getItem('applicantId') ?? '';
      if (applicantId != undefined && applicantId != '') {
        let response = await this.lookupService.GetApplicantSavedJobsList(applicantId);
        if (response) {
          if(response != null && response.Message != null && response.Message == "Authentication failed.") {
            response = await this.lookupService.GetApplicantSavedJobsList(applicantId);
          }
          this.savedJobs = response?.parmApplicantSavedJobsList;
        }
      }
    }

    async GetUserInfo() {
      let applicantId = localStorage.getItem('applicantId') ?? '';
      try {
        let response = await this.lookupService.GetUserDetails(applicantId);
        if (response) {
          if(response != null && response.Message != null && response.Message == "Authentication failed.") {
            response = await this.lookupService.GetUserDetails(applicantId);
            if(response != null && response.Message != null && response.Message == "Authentication failed.") {
              response = await this.lookupService.GetUserDetails(applicantId);
            }
          }
          localStorage.setItem('userNameAr', response.firstNameAr);
          localStorage.setItem('userName', response?.firstName);
          localStorage.setItem('defenderenabled', response?.MicrosoftDefenderAzureBlob?.toString() ?? "0");
          this.SetApplicantInfo(response);
        }
      } catch (ex) {
        console.error();
      }
    }
}