import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-saved-jobs',
  templateUrl: './saved-jobs.component.html',
  styleUrls: ['./saved-jobs.component.scss']
})
export class SavedJobsComponent {
  jobList:any[]=[];
  constructor(private router:Router){}
  GoToJobs() {
    this.router.navigate(['/jobs']);
  }
}
