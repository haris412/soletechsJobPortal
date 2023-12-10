import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-saved-jobs',
  templateUrl: './saved-jobs.component.html',
  styleUrls: ['./saved-jobs.component.scss']
})
export class SavedJobsComponent implements OnInit {
  @Input() savedJobs:any[] = [];
  jobList:any[]=[];
  constructor(private router:Router){}
  ngOnInit() {
  }
  GoToJobs() {
    this.router.navigate(['/jobs']);
  }
}
