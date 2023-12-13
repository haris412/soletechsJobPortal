import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AppLookUpService } from 'src/app/app-services/app-look-up.service';
import { ApplicantDataService } from '../services/applicant-shared.service';

@Component({
  selector: 'app-saved-jobs',
  templateUrl: './saved-jobs.component.html',
  styleUrls: ['./saved-jobs.component.scss']
})
export class SavedJobsComponent implements OnInit,OnChanges {
  @Input() savedJobs:any[] = [];
  jobList:any[]=[];
  constructor(private router:Router,
              public applicantService: ApplicantDataService){}
  async ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes?.savedJobs?.currentValue){
      this.savedJobs = changes.savedJobs.currentValue;
    }
  }
  GoToJobs() {
    this.router.navigate(['/jobs']);
  }
}
