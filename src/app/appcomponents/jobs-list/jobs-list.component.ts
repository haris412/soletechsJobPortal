import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { AppLookUpService } from 'src/app/app-services/app-look-up.service';
import { RecruitmentService } from 'src/app/app-services/jobs.service';
import { JobDetailParameter } from 'src/app/models/job-detail-parameter';
import { Job } from 'src/app/models/job.model';
import { SharedService } from 'src/app/shared/services/shared.service';
import { TranslocoService } from '@ngneat/transloco';
import { ApplicantDataService } from 'src/app/modules/applicant-portal/services/applicant-shared.service';
import { TranslationAlignmentService } from 'src/app/app-services/translation-alignment.service';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.scss'],
  host: {
    '(window:resize)': 'onWindowResize($event)',
  },
})
export class JobsListComponent implements OnInit {
  @ViewChild(MatMenuTrigger, { static: true, read: ElementRef })
  userMenu!: ElementRef<HTMLElement>;
  menuWidth: any;
  isActive: boolean = false;
  width: number = window.innerWidth;
  minimunWidth: number = 992;
  show: boolean = true;
  mobileView: boolean = false;
  webView: boolean = true;
  inputText: string = '';
  jobsList: Job[] = [];
  selectedJob: Job = new Object() as Job;
  jobDetail: any = new Object() as any;
  email:string = '';
  applyBtn:string = 'Apply';
  disableBtn:boolean = false;
  jobsListCopy:Job[] = [];
  locationText:string ='';
  jobDetailVisibility: boolean = false;
  sortBy:boolean = false;
  constructor(private recruitmentService: RecruitmentService,
    public sharedService: SharedService,
    public lookupService: AppLookUpService,
    public applicantService: ApplicantDataService,
    public translationService: TranslationAlignmentService
    
    ) { 
      this.email = localStorage.getItem('email') ?? '';
      if(this.email){
        this.sharedService.GetAppliedJobs();
      }
      this.translationService.languageChange.subscribe(x => {
        this.translationService.isTranslate = x;
        this.JobLanguageChanges();
      });
    }

  async ngOnInit() {
    this.mobileView = this.width < this.minimunWidth;
    if (this.mobileView && this.selectedJob.id === undefined) {
      this.show = false;
      this.webView = false;
    } else if (this.mobileView && this.selectedJob.id !== undefined) {
      this.webView = false;
      this.show = true;
    }
    await this.GetToken();
    await this.getRecruitmentProjectsList();
    this.sharedService.jobs = this.sharedService.DeepCopyObject(this.jobsList);
    this.JobLanguageChanges();
    var applicantId = localStorage.getItem('applicantId');
    if (applicantId != undefined && applicantId != "") {
      this.sharedService.isUserLoggedIn = true;
    }
    if(this.applicantService.selectedSavedJob != undefined && this.applicantService.selectedSavedJob != null) {
      var job = this.jobsList.find(x => x.recruitingId == this.applicantService.selectedSavedJob.recruitingId) as Job;
      if (job != undefined) {
        this.OpenJob(job);
      }
    }
  }

  async getRecruitmentProjectsList() {
    let jobsResponseObj = await this.recruitmentService.GetStartedRecruitingList();
    if (jobsResponseObj) {
      this.jobsList = jobsResponseObj.parmRecruitmentProjectsList ?? [];
      this.jobsListCopy = jobsResponseObj.parmRecruitmentProjectsList ?? [];
      if(this.jobsList?.length > 0){
        localStorage.setItem('defenderenabled',this.jobsList[0]?.MicrosoftDefenderAzureBlob?.toString() ? this.jobsList[0]?.MicrosoftDefenderAzureBlob?.toString() : '0')
      }
    }
  }

  async JobLanguageChanges() {
    if (this.translationService.isTranslate) {
      for(let i = 0; i < this.jobsList.length; i++) {
        this.jobsList[i].description = this.sharedService.jobs[i]?.jobArabic ? this.sharedService.jobs[i]?.jobArabic : this.sharedService.jobs[i]?.description;
        this.jobsList[i].JobLocation = this.sharedService.jobs[i]?.jobLocationArabic ? this.sharedService.jobs[i]?.jobLocationArabic : this.sharedService.jobs[i]?.JobLocation;
        this.jobsList[i].recruitingId = this.sharedService.jobs[i]?.recruitingArabic ? this.sharedService.jobs[i]?.recruitingArabic : this.sharedService.jobs[i]?.recruitingId;
        this.jobsList[i].JobType = this.sharedService.jobs[i]?.jobTypeArabic ? this.sharedService.jobs[i]?.jobTypeArabic : this.sharedService.jobs[i]?.JobType;
      }
    } else {
      this.jobsList = this.sharedService.DeepCopyObject(this.sharedService.jobs);
    } 
  }

  OpenJob(job: Job) {
    this.jobDetailVisibility = false;
    this.applyBtn = "Apply";
    this.disableBtn = false;
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
      this.jobDetailVisibility = true;
      this.jobDetail = jobDetailResponse;
      if (this.sharedService.appliedJobs?.length > 0) {
        let appliedJob = this.sharedService.appliedJobs?.find((job: any) => job?.jobId === this.jobDetail?.jobId);
        if (appliedJob) {
          this.applyBtn = 'Applied';
          this.disableBtn = true;
        } else {
          this.applyBtn = 'Apply';
          this.disableBtn = false;
        }
      }
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
  Locationchange(event:any){
    if (event?.target?.value?.length >= 1) {
      this.jobsList = this.jobsListCopy.filter((job: Job) => job.JobLocation.toLowerCase().includes(event?.target.value.toLowerCase()));
    } else {
      this.jobsList = this.jobsListCopy;
    }
  }
  Valuechange(event:any){
    if(event?.target?.value?.length >= 1){
      this.jobsList = this.jobsListCopy.filter((job:Job)=> job.recruitingId.toLowerCase().includes(event?.target.value.toLowerCase()));
      this.sharedService.jobs = this.sharedService.DeepCopyObject(this.jobsListCopy.filter((job:Job)=> job.recruitingId.toLowerCase().includes(event?.target.value.toLowerCase())));
    }else{
      this.jobsList = this.jobsListCopy;
      this.sharedService.jobs = this.sharedService.DeepCopyObject(this.jobsListCopy);
    }
    this.JobLanguageChanges();
  }
  JobTypeChange(event:any){
    if(event?.target?.value?.length >= 1){
      this.jobsList = this.jobsListCopy.filter((job:Job)=> job.JobType.toLowerCase().includes(event?.target.value.toLowerCase()));
    }else{
      this.jobsList = this.jobsListCopy;
    }
  }

  async GetToken() {
    let accessTokenResponse = await this.recruitmentService.AuthenticationByCompanyIdAsync('');
    if (accessTokenResponse) {
      this.sharedService.SetToken(accessTokenResponse.access_token);
    }
  }
  SortBy() {
    // this.menuWidth = this.userMenu.nativeElement.clientWidth;
    this.sortBy = !this.sortBy;
    if (this.sortBy) {
      this.jobsList = this.jobsList?.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
    } else {
      this.jobsList = this.jobsList?.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
    }
  }
}
