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
    applicantData:any;
    public selectedSavedJob: any;

    constructor(public lookupService: AppLookUpService) {}

    SetJob(job:any){
      this.selectedJob = job;
    }
    GetJob(){
      return this.selectedJob;
    }
    SetApplicantInfo(applicantInfo:any){
      this.applicantData = applicantInfo;
    }
    GetApplicantInfo(){
      return this.applicantData;
    }
    isJobAlreadySaved(job: any) {
      return this.savedJobs.find(x => x.recruitingId == job.recruitingId) != undefined;
    }

    async GetApplicantSavedJobsList(){
      let applicantId = localStorage.getItem('applicantId') ?? '';
      if (applicantId != undefined && applicantId != '') {
        let response = await this.lookupService.GetApplicantSavedJobsList(applicantId);
        if (response) {
          this.savedJobs = response?.parmApplicantSavedJobsList;
        }
      }
    }
}