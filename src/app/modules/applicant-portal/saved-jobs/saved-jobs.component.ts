import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppLookUpService } from 'src/app/app-services/app-look-up.service';
import { ApplicantDataService } from '../services/applicant-shared.service';

@Component({
  selector: 'app-saved-jobs',
  templateUrl: './saved-jobs.component.html',
  styleUrls: ['./saved-jobs.component.scss']
})
export class SavedJobsComponent implements OnInit {
  @Input() savedJobs:any[] = [];
  jobList:any[]=[];
  constructor(private router:Router,
              public applicantService: ApplicantDataService){}
  async ngOnInit() {
    console.log(this.savedJobs);
  }
  GoToJobs() {
    this.router.navigate(['/jobs']);
  }
}
