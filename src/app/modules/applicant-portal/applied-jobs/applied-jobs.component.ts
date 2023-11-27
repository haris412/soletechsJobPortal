import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-applied-jobs',
  templateUrl: './applied-jobs.component.html',
  styleUrls: ['./applied-jobs.component.scss']
})
export class AppliedJobsComponent implements OnInit , OnChanges{
  @Input() appliedJobs:any = new Object() as any;
  public completed: boolean = false;
  constructor(private router: Router) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes?.appliedJobs?.currentValue){
      this.appliedJobs = changes.appliedJobs.currentValue;
    }
  }
  ngOnInit(): void {
    console.log(this.appliedJobs);
  }
  GoToJobActions() {
    this.router.navigate(['/applicant/job-actions']);
  }
  GoToJobs(){
    this.router.navigate(['/jobs']);
  }
}
