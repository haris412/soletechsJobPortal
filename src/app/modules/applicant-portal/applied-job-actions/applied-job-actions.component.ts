import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RescheduleModalComponentService } from 'src/app/shared/reschedule-modal/reschedule-modal.service';
import { ApplicantDataService } from '../services/applicant-shared.service';
import { AppLookUpService } from 'src/app/app-services/app-look-up.service';

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
  constructor(
    private router: Router,
    private dialog: RescheduleModalComponentService,
    private applicantService:ApplicantDataService,
    private lookUpService:AppLookUpService,
    private route: ActivatedRoute
  ) {
    console.log(this.route.params);
    this.route.params.subscribe(
      params => 
      this.applicationId = params?.id
    );
    console.log(this.applicationId);
  
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
