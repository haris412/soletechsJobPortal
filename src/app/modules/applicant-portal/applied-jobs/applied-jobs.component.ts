import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicantDataService } from '../services/applicant-shared.service';

@Component({
  selector: 'app-applied-jobs',
  templateUrl: './applied-jobs.component.html',
  styleUrls: ['./applied-jobs.component.scss']
})
export class AppliedJobsComponent implements OnInit , OnChanges{
  @Input() appliedJobs:any = new Object() as any;
  public receivedStage: boolean = false;
  public completed: boolean = false;
  public confirmedStage: boolean = false;
  public interviewStage: boolean = false;
  public offerStage: boolean = false;
  public onBoardingStage: boolean = false;

  constructor(private router: Router,private applicantService:ApplicantDataService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes?.appliedJobs?.currentValue){
      this.appliedJobs = changes.appliedJobs.currentValue;
    }
  }
  ngOnInit(): void {
  }
  GoToJobActions(selectedJob:any) {
    this.applicantService.SetJob(selectedJob);
    localStorage.setItem("applicationId", selectedJob?.applicationId);
    this.router.navigate(['/applicant/job-actions' , selectedJob?.applicationId]);
  }
  GoToJobs(){
    this.router.navigate(['/jobs']);
  }
}
