import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RescheduleModalComponentService } from 'src/app/shared/reschedule-modal/reschedule-modal.service';
import { ApplicantDataService } from '../services/applicant-shared.service';

@Component({
  selector: 'app-applied-job-actions',
  templateUrl: './applied-job-actions.component.html',
  styleUrls: ['./applied-job-actions.component.scss']
})
export class AppliedJobActionsComponent implements OnInit{
  public completed: boolean = false;
  jobList:any[]=[];
  selectedJob:any;
  constructor(
    private router: Router,
    private dialog: RescheduleModalComponentService,
    private applicantService:ApplicantDataService
  ) {

  }

  ngOnInit() {
    this.selectedJob = this.applicantService.GetJob();
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
