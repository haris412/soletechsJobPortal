import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RescheduleModalComponentService } from 'src/app/shared/reschedule-modal/reschedule-modal.service';
import { ApplicantDataService } from '../services/applicant-shared.service';
import { AppLookUpService } from 'src/app/app-services/app-look-up.service';
import { TranslationAlignmentService } from 'src/app/app-services/translation-alignment.service';

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
  public isTranslate: boolean = this.translationService.isTranslate;
  constructor(
    private router: Router,
    private dialog: RescheduleModalComponentService,
    private applicantService:ApplicantDataService,
    private lookUpService:AppLookUpService,
    private route: ActivatedRoute,
    public translationService: TranslationAlignmentService
  ) {
    this.route.params.subscribe(
      params => 
      this.applicationId = params?.id
    );
    this.translationService.languageChange.subscribe(x=>{{
      this.isTranslate=x;
    }});
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
}
