import { Component, OnInit } from '@angular/core';
import { RecruitmentService } from 'src/app/app-services/jobs.service';
import { jobsQueryParameters } from 'src/app/models/get-jobs-parameters.model';
import { JobDetailParameter } from 'src/app/models/job-detail-parameter';
import { Job } from 'src/app/models/job.model';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.scss'],
  host: {
    '(window:resize)': 'onWindowResize($event)',
  },
})
export class JobsListComponent implements OnInit {

  isActive: boolean = false;
  width: number = window.innerWidth;
  minimunWidth: number = 992;
  show: boolean = true;
  mobileView: boolean = false;
  webView: boolean = true;
  showJobList: boolean = true;
  inputText: string = '';
  jobsList: Job[] = [];
  selectedJob: Job = new Object() as Job;


  constructor(private recruitmentService: RecruitmentService,
              private sharedService:SharedService) { }

  ngOnInit(): void {
    this.mobileView = this.width < this.minimunWidth;
    if (this.mobileView && this.selectedJob.$id === undefined) {
      this.show = false;
      this.webView = false;
    } else if (this.mobileView && this.selectedJob.$id !== undefined) {
      this.webView = false;
      this.show = true;
    }
    // if(!localStorage.getItem('token')){
     this.GetToken();
    // }else{
    //   this.GetJobs(localStorage.getItem('token') ?? '');
    // }
  }

  async GetJobs(token: string) {
    let params: jobsQueryParameters = {
      _dataAreaId: 'USMF',
      _languageId: "en-us"
    }
    let jobsResponseObj = await this.recruitmentService.GetRecruitmentInformationList(token);
    if (jobsResponseObj?.statusCode === 200) {
      console.log(jobsResponseObj);
    }
  }

  async getRecruitmentProjectsList(token:string){
    let params: jobsQueryParameters = {
      _dataAreaId: 'USMF',
      _languageId: "en-us"
    }
    let jobsResponseObj = await this.recruitmentService.GetRecruitmentProjectsList(params,token);
    if (jobsResponseObj) {
      this.jobsList = jobsResponseObj.parmRecruitmentProjectsList;
      console.log(this.jobsList);
    }
  }
  async GetToken() {
    let accessTokenResponse = await this.recruitmentService.AuthenticationByCompanyIdAsync('');
    if (accessTokenResponse) {
      this.sharedService.SetToken(accessTokenResponse.access_token);
      localStorage.setItem('token', accessTokenResponse.access_token);
      if (accessTokenResponse.access_token) {
        this.getRecruitmentProjectsList(accessTokenResponse.access_token);
      }
    }
  }

  OpenJob(job: Job) {
    this.selectedJob = job;
    this.GetJobDetail(job);
    this.isActive = true;
    if (this.mobileView) {
      this.show = true;
      this.webView = false;
    } else {
      this.webView = true;
    }
  }

  async GetJobDetail(job:Job){
    let jobDetailParam: JobDetailParameter = {
      _jobRecid: job.recruitingId,
      _dataAreaId: 'USMF',
      _languageId: 'En-us'
    }
    let jobDetailResponse = await this.recruitmentService.GetJobDetail(jobDetailParam);
    if (jobDetailResponse) {
      console.log(jobDetailResponse);
    }
  }

  onWindowResize(event: any) {
    this.width = event.target.innerWidth;
    this.mobileView = this.width < this.minimunWidth;
    if (this.mobileView && this.selectedJob.$id !== undefined) {
      this.webView = false;
      this.show = true;
    } else if (this.mobileView && this.selectedJob.$id === undefined) {
      this.show = false;
      this.webView = false;
    } else {
      this.webView = true;
      this.show = false;
    }
  }
  BackClicked(event: boolean) {
    if (this.mobileView) {
      this.show = false;
      this.webView = false;
    }
  }


  onEnterPressed() {
    const inputText = this.inputText;
    console.log(inputText);
  }

}
