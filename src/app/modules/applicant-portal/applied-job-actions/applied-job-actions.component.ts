import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RescheduleModalComponentService } from 'src/app/shared/reschedule-modal/reschedule-modal.service';
import { ApplicantDataService } from '../services/applicant-shared.service';
import { AppLookUpService } from 'src/app/app-services/app-look-up.service';
import { TranslationAlignmentService } from 'src/app/app-services/translation-alignment.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { Location } from '@angular/common';
import { OfferModalComponentService } from 'src/app/shared/offer-modal/offer-modal.service';
import { RejectModalComponentService } from 'src/app/shared/reject-offer/reject-offer.service';

@Component({
  selector: 'app-applied-job-actions',
  templateUrl: './applied-job-actions.component.html',
  styleUrls: ['./applied-job-actions.component.scss']
})
export class AppliedJobActionsComponent implements OnInit{
  public completed: boolean = false;
  jobList:any[]=[];
  selectedJob:any;
  applicationId:string = '';
  dialogRef:any;
  @Output() interviewConfirmed: EventEmitter<boolean> = new EventEmitter();
  public isTranslate: boolean = this.translationService.isTranslate;
  constructor(
    private location:Location,
    private router: Router,
    private dialog: RescheduleModalComponentService,
    private applicantService:ApplicantDataService,
    private lookUpService:AppLookUpService,
    private route: ActivatedRoute,
    public translationService: TranslationAlignmentService,
    private toastrService: ToastrService,
    public sharedService: SharedService,
    public acceptOfferModal: OfferModalComponentService,
    public rejectModal: RejectModalComponentService
  ) {
    this.route.params.subscribe(
      params => 
      this.applicationId = params?.id
    );
    this.translationService.languageChange.subscribe(x=> {
      this.translationService.isTranslate = x;
      this.AppliedJobActionsLanguageChanges();
    });
  }

  ngOnInit() {
    this.selectedJob = this.applicantService.GetJob();
    if(!this.selectedJob?.applicationId){
      this.GetApplicationByApplicationId();
    }
  }

  async GetApplicationByApplicationId(){
   let response = await this.lookUpService.GetApplicationDetails(this.applicationId);
   if(response){
    this.selectedJob = response;
    console.log(this.selectedJob);
    this.sharedService.selectedJobActions = this.sharedService.DeepCopyObject(this.selectedJob);
    this.AppliedJobActionsLanguageChanges();
   }
  }

  toOnboarding() {
    this.router.navigate(['/applicant/onboarding'])
  }

  OpenReschedule() {
    const dialogRef = this.dialog.openDialog('');
  }

  toJobOffer() {
    this.router.navigate(['/applicant/job-offer']);
  }
  AppliedJobActionsLanguageChanges() {
    if (this.selectedJob !== null) {
      if (this.translationService.isTranslate) {
        this.selectedJob.Description = this.sharedService.selectedJobActions?.jobArabic ? this.sharedService.selectedJobActions?.jobArabic : this.sharedService.selectedJobActions?.Description;
        this.selectedJob.Title = this.sharedService.selectedJobActions?.JobArabic ? this.sharedService.selectedJobActions?.JobArabic : this.sharedService.selectedJobActions?.Title;
        this.selectedJob.JobLocation = this.sharedService.selectedJobActions?.jobLocationArabic ? this.sharedService.selectedJobActions?.jobLocationArabic : this.sharedService.selectedJobActions?.JobLocation;
        this.selectedJob.JobAd = this.sharedService.selectedJobActions?.jobadTextArabic ? this.sharedService.selectedJobActions?.jobadTextArabic : this.sharedService.selectedJobActions?.JobAd;
        this.selectedJob.Overview = this.sharedService.selectedJobActions?.ArabicOverview ? this.sharedService.selectedJobActions?.ArabicOverview : this.sharedService.selectedJobActions?.Overview; 
        this.selectedJob.jobType  = this.sharedService.selectedJobActions?.JobTypeArabic ? this.sharedService.selectedJobActions?.JobTypeArabic : this.sharedService.selectedJobActions?.JobType; 
      } else {
        this.selectedJob = this.sharedService.DeepCopyObject(this.sharedService.selectedJobActions);
      }     
    }
  }
  async Confirm(appliedJob:any, interview:any){
    let res =  await this.lookUpService.GetConfirmInterviewer(appliedJob.applicationId,interview.InterviewerRecid);
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
  }
  GetDay(date:any){
    const dateObject = moment(date);
    // Get the day of the month
    const day = dateObject.date();
    return day
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
  GoBack() {
    this.location.back();
  }
  acceptOffer() {
    this.dialogRef = this.acceptOfferModal.openDialog('');
  }
  RejectOffer() {
    this.dialogRef = this.rejectModal.openDialog('');
  }
}
