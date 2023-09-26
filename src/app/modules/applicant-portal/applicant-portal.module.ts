import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicantComponent } from './applicant.component';
import { LeftSideInfoComponent } from './left-side-info/left-side-info.component';
import { AppliedJobsComponent } from './applied-jobs/applied-jobs.component';
import { SavedJobsComponent } from './saved-jobs/saved-jobs.component';
import { RouterModule } from '@angular/router';
import { ApplicantRoutes } from './applicant-routing.module';



@NgModule({
  declarations: [ApplicantComponent, LeftSideInfoComponent, AppliedJobsComponent, SavedJobsComponent],
  imports: [
    RouterModule.forChild(ApplicantRoutes),
    CommonModule
  ]
})
export class ApplicantPortalModule { }
