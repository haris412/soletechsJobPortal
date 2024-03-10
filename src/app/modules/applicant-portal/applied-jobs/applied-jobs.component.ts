import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicantDataService } from '../services/applicant-shared.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { TranslationAlignmentService } from 'src/app/app-services/translation-alignment.service';
import { AppLookUpService } from 'src/app/app-services/app-look-up.service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

@Component({
  selector: 'app-applied-jobs',
  templateUrl: './applied-jobs.component.html',
  styleUrls: ['./applied-jobs.component.scss']
})
export class AppliedJobsComponent implements OnInit , OnChanges{
  @Input() appliedJobs:any = new Object() as any;
  @Input() isTranslate:boolean = false;
  @Output() interviewConfirmed: EventEmitter<boolean> = new EventEmitter();
  public receivedStage: boolean = false;
  public completed: boolean = false;
  public confirmedStage: boolean = false;
  public interviewStage: boolean = false;
  public offerStage: boolean = false;
  public onBoardingStage: boolean = false;
  public inProgress: boolean = false;
  public applicationStatus: string = 'Pending Approval';

  constructor(private router: Router,
              private applicantService:ApplicantDataService,
              private applicationService:AppLookUpService,
              public sharedService: SharedService,
              private toastrService: ToastrService,
              public translationService: TranslationAlignmentService) {
                this.translationService.languageChange.subscribe(x => {
                  this.translationService.isTranslate = x;
                  this.AppliedJobsLanguageChanges();
                });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes?.appliedJobs?.currentValue){
      this.appliedJobs = changes.appliedJobs.currentValue;
      this.sharedService.appliedJobsCopy = this.sharedService.DeepCopyObject(this.appliedJobs);
    }
    this.AppliedJobsLanguageChanges();
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
  toJobOffer(application:any) {
    localStorage.setItem('applicationId',application.applicationId);
    this.router.navigate(['/applicant/job-offer']);
  }
  toOnboarding(application:any) {
    localStorage.setItem('applicationId',application.applicationId);
    this.router.navigate(['/applicant/onboarding'])
  }
  async Confirm(appliedJob:any, interview:any){
   let res =  await this.applicationService.GetConfirmInterviewer(appliedJob.applicationId,interview.InterviewerRecid);
   if(res.Status){
   this.toastrService.success(res.Message);
   this.interviewConfirmed.emit(true);
   }else{
    this.toastrService.error(res.Message);
   }
  }

  GetMonth(date:any){
    let updatedDate = moment(date).format("DD.MM.YYYY");
    let momentDate = moment(updatedDate, 'DD.MM.YYYY', true);
    return momentDate.format('MMMM');
    // console.log(moment(updatedDate).format('MM'));
  }
  GetDay(date:any){
    const dateObject = moment(date);
    // Get the day of the month
    const day = dateObject.date();
    return day
    // console.log(moment(updatedDate).format('MM'));
  }

  GetTimeDifference(startDateTime:any, endDateTime:any){
    const startTime = moment(startDateTime);
    const endTime = moment(endDateTime);
    const duration = moment.duration(endTime.diff(startTime));
    const minutes = Math.floor(duration.asMinutes()) % 60;
    return minutes;
  }
  GetYear(date:string){
    const dateObject = moment(date);
    const year = dateObject.year();
    return year;
  }
  OpenReschedule(){}
  ApplicationStatus(status:string) :string {
    switch(status){
      case 'in-progress':
        this.inProgress = true;
        this.applicationStatus = 'In Progress'
        break;
      case 'pending':
        this.inProgress = false;
        this.applicationStatus = 'Pending Approval'
        break;
    }
    return this.applicationStatus;
  }
}
