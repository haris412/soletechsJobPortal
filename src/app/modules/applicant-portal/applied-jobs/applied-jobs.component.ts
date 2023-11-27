import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-applied-jobs',
  templateUrl: './applied-jobs.component.html',
  styleUrls: ['./applied-jobs.component.scss']
})
export class AppliedJobsComponent {
  @Input() appliedJobs:any = new Object() as any;
  public completed: boolean = false;
  jobList:any[]=[ {name:'Designer', type:'Full Time'}];
  constructor(private router: Router) {

  }
  GoToJobActions() {
    this.router.navigate(['/applicant/job-actions']);
  }
  GoToJobs(){
    this.router.navigate(['/jobs']);
  }
}
