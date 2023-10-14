import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-applied-jobs',
  templateUrl: './applied-jobs.component.html',
  styleUrls: ['./applied-jobs.component.scss']
})
export class AppliedJobsComponent {
  public completed: boolean = false;
  jobList:any[]=[];
  constructor(private router: Router) {

  }
  toJobActions() {
    this.router.navigate(['/applicant/job-actions'])
  }
}
