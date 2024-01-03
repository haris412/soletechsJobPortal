import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicantDataService } from '../services/applicant-shared.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { TranslationAlignmentService } from 'src/app/app-services/translation-alignment.service';

@Component({
  selector: 'app-applied-jobs',
  templateUrl: './applied-jobs.component.html',
  styleUrls: ['./applied-jobs.component.scss']
})
export class AppliedJobsComponent implements OnInit , OnChanges{
  @Input() appliedJobs:any = new Object() as any;
  @Input() isTranslate:boolean = false;
  public receivedStage: boolean = false;
  public completed: boolean = false;
  public confirmedStage: boolean = false;
  public interviewStage: boolean = false;
  public offerStage: boolean = false;
  public onBoardingStage: boolean = false;

  constructor(private router: Router,
              private applicantService:ApplicantDataService,
              public sharedService: SharedService,
              public translationService: TranslationAlignmentService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes?.appliedJobs?.currentValue){
      this.appliedJobs = changes.appliedJobs.currentValue;
      this.appliedJobs = this.appliedJobs?.filter((job:any)=> job?.approvedApplication == 1);
    }
  }
  ngOnInit(): void {
  }
  GoToJobActions(selectedJob:any) {
    this.applicantService.SetJob(selectedJob);
    const id = selectedJob?.applicationId;
    localStorage.setItem("applicationId", id);
    this.router.navigate(['/applicant/job-actions' , id]);
  }
  GoToJobs(){
    this.router.navigate(['/jobs']);
  }

  JobDetailLanguageChanges() {
    // if (this.appliedJobs != null) {
    //   if (this.translationService.isTranslate) {
    //     this.selectedJob.Description = this.sharedService.jobDetail?.jobArabic ? this.sharedService.jobDetail?.jobArabic : this.sharedService.jobDetail?.Description;
    //     this.selectedJob.JobLocation = this.sharedService.jobDetail?.jobLocationArabic ? this.sharedService.jobDetail?.jobLocationArabic : this.sharedService.jobDetail?.JobLocation;
    //     this.selectedJob.JobAd = this.sharedService.jobDetail?.jobadTextArabic ? this.sharedService.jobDetail?.jobadTextArabic : this.sharedService.jobDetail?.JobAd;
    //     this.selectedJob.Overview = this.sharedService.jobDetail?.OverviewArabic ? this.sharedService.jobDetail?.OverviewArabic : this.sharedService.jobDetail?.Overview;  
    //     // this.selectedJob.Skills = this.sharedService.jobDetail?.SkillsArabicList ? this.sharedService.jobDetail?.SkillsArabicList : this.sharedService.jobDetail?.Skills;        
    //     for(let skill of this.selectedJob.Skills?.parmRecruitmentSkillsList) {
    //       skill.Skill = skill.skillsArabic ? skill.skillsArabic : skill.Skill;
    //     }
    //   } else {
    //     this.selectedJob = this.sharedService.DeepCopyObject(this.sharedService.jobDetail);
    //   }     
    // }
  }
}
