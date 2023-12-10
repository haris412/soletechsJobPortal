import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LinkedInService } from '../services/linkedin.service';
import { environment } from 'src/environments/environment';
import { AppLookUpService } from 'src/app/app-services/app-look-up.service';
import { ApplicantDataService } from '../services/applicant-shared.service';
import { SavedJobs } from '../models/savedJobs';

@Component({
  selector: 'app-applicant-dashboard',
  templateUrl: './applicant-dashboard.component.html',
  styleUrls: ['./applicant-dashboard.component.scss']
})
export class ApplicantDashboardComponent implements OnInit {

  appliedJobs:any[] = [];
  savedJobs:any[] = [];
  constructor(private activatedRoute: ActivatedRoute, 
    public linkedInServive: LinkedInService,
    private lookUpService:AppLookUpService,
    public applicantService: ApplicantDataService,
    private route: Router) {
  }

  async ngOnInit() {
    this.activatedRoute.queryParams.subscribe(async params => {
      const code = params['code'];
      if (code) {
        this.GetAccessToken(code);
      }
    });
    await this.GetAppliedJobs();
    await this.SavedJobsList();
  }

  GetAccessToken(code: string) {
    let url = `client_id=${environment.clientId}&client_secret=${environment.clientSecret
               }&redirect_uri=${environment.redirect_uri}&code=${code}`;
    this.linkedInServive.GetAccessToken(url).subscribe(res => {
      if (res != null && res.access_token != undefined && res.access_token != "invalid_request") {
        this.linkedInServive.accessToken = res.access_token;
        this.GetLinkedInUserInfo();
      } else {
        this.route.navigateByUrl('/');
      }
    });
  }

  GetLinkedInUserInfo() {
    this.linkedInServive.GetUserInfoLinkedIn().subscribe(res => {
      localStorage.setItem('linkedInUserInfo', JSON.stringify(res));
      this.linkedInServive.userInfo = res;
    }
    );
  }
  async GetAppliedJobs(){
    let applicantId = localStorage.getItem('applicantId') ?? '';
    let response = await this.lookUpService.MyApplicationJobList(applicantId);
    if(response){
      this.appliedJobs = response?.parmRecruitmentApplicationJobList;
      this.GetApplicantSavedJobsList();
    }
  }
  async GetApplicantSavedJobsList(){
    let applicantId = localStorage.getItem('applicantId') ?? '';
    let response = await this.lookUpService.GetApplicantSavedJobsList(applicantId);
    if(response){
      let savedJobsIds = response?.parmApplicantSavedJobsList;
      if(savedJobsIds?.length > 0){
        savedJobsIds?.forEach((id:any) => {
          this.appliedJobs?.forEach((job:any) => {
            if(job?.jobId === id){
              this.savedJobs.push(job);
            }
          });
        });  
      }
    }
  }

  async SavedJobsList() {
    var data = await this.lookUpService.GetApplicantSavedJobsList(localStorage.getItem('applicantId') ?? "");
    if (data != null && data.parmApplicantSavedJobsList != null) {
      this.applicantService.savedJobs = [];
      for (var item of data.parmApplicantSavedJobsList) {
        var savedJobs = new SavedJobs();
        savedJobs.id = item["$id"];
        savedJobs.jobName = item.JobId;
        this.applicantService.savedJobs.push(savedJobs);
      }
    }
  }
}
