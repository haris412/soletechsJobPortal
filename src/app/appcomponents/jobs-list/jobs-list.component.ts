import { Component, OnInit } from '@angular/core';
import { RecruitmentService } from 'src/app/app-services/jobs.service';
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
  jobDetail: any = new Object() as any;
  constructor(private recruitmentService: RecruitmentService,
    private sharedService: SharedService) { }

  async ngOnInit() {
    this.mobileView = this.width < this.minimunWidth;
    if (this.mobileView && this.selectedJob.id === undefined) {
      this.show = false;
      this.webView = false;
    } else if (this.mobileView && this.selectedJob.id !== undefined) {
      this.webView = false;
      this.show = true;
    }
    await this.getRecruitmentProjectsList();
  }

  async getRecruitmentProjectsList() {
    let jobsResponseObj = await this.recruitmentService.GetStartedRecruitingList();
    if (jobsResponseObj) {
      this.jobsList = jobsResponseObj.parmRecruitmentProjectsList ?? [];
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

  async GetJobDetail(job: Job) {
    let jobDetailParam: JobDetailParameter = {
      _jobRecid: job.job,
      _dataAreaId: 'USMF',
      _languageId: 'En-us'
    }
    let jobDetailResponse = await this.recruitmentService.GetJobDetail(jobDetailParam);
    if (jobDetailResponse) {
      this.jobDetail = jobDetailResponse;
    }
  }

  onWindowResize(event: any) {
    this.width = event.target.innerWidth;
    this.mobileView = this.width < this.minimunWidth;
    if (this.mobileView && this.selectedJob.id !== undefined) {
      this.webView = false;
      this.show = true;
    } else if (this.mobileView && this.selectedJob.id === undefined) {
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
  }

}
