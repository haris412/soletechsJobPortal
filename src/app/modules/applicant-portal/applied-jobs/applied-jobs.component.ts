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
                this.translationService.languageChange.subscribe(x => {
                  this.translationService.isTranslate = x;
                  this.AppliedJobsLanguageChanges();
                });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes?.appliedJobs?.currentValue){
      this.appliedJobs = changes.appliedJobs.currentValue;
      this.appliedJobs = this.appliedJobs?.filter((job:any)=> job?.approvedApplication == 1);
      this.sharedService.appliedJobsCopy = this.sharedService.DeepCopyObject(this.appliedJobs);
    }
  }
  ngOnInit(): void {
    this.sharedService.appliedJobsCopy = this.sharedService.DeepCopyObject(this.appliedJobs);
    this.AppliedJobsLanguageChanges();
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

  AppliedJobsLanguageChanges() {
    if (this.appliedJobs?.length > 0) {
      if (this.translationService.isTranslate) {
        for(let i = 0; i < this.appliedJobs.length; i++) {
          this.appliedJobs[i].Title = this.sharedService.appliedJobsCopy[i]?.JobArabic ? this.sharedService.appliedJobsCopy[i]?.JobArabic : this.sharedService.appliedJobsCopy[i]?.Title;
          this.appliedJobs[i].Overview = this.sharedService.appliedJobsCopy[i]?.ArabicOverview ? this.sharedService.appliedJobsCopy[i]?.ArabicOverview : this.sharedService.appliedJobsCopy[i]?.Overview;
          this.appliedJobs[i].JobLocation = this.sharedService.appliedJobsCopy[i]?.jobLocationArabic ? this.sharedService.appliedJobsCopy[i]?.jobLocationArabic : this.sharedService.appliedJobsCopy[i]?.JobLocation;
          this.appliedJobs[i].jobType = this.sharedService.appliedJobsCopy[i]?.jobTypeArabic ? this.sharedService.appliedJobsCopy[i]?.jobTypeArabic : this.sharedService.appliedJobsCopy[i]?.JobType;
        }
      } else {
        this.appliedJobs = this.sharedService.DeepCopyObject(this.sharedService.appliedJobsCopy);
      }     
    }
  }
}
