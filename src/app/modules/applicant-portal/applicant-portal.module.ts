import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicantComponent } from './applicant.component';
import { LeftSideInfoComponent } from './left-side-info/left-side-info.component';
import { AppliedJobsComponent } from './applied-jobs/applied-jobs.component';
import { SavedJobsComponent } from './saved-jobs/saved-jobs.component';
import { RouterModule } from '@angular/router';
import { ApplicantDashboardComponent } from './applicant-dashboard/applicant-dashboard.component';
import { AppliedJobActionsComponent } from './applied-job-actions/applied-job-actions.component';
import { applicatRoutes } from './applicat.routing';
import { ApplicantOnboardingModule } from './applicant-onboarding/applicant-onboarding.module';
import { MaterialModule } from 'src/app/material/material.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { JobOfferComponent } from './job-offer/job-offer.component';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    ApplicantComponent, 
    LeftSideInfoComponent, 
    AppliedJobsComponent, 
    SavedJobsComponent, 
    ApplicantDashboardComponent, 
    AppliedJobActionsComponent, JobOfferComponent, 
  ],
  imports: [
    HttpClientModule,
    RouterModule.forChild(applicatRoutes),
    CommonModule,
    ApplicantOnboardingModule,
    MaterialModule,
    CKEditorModule,
    ToastrModule.forRoot(),
  ],
})
export class ApplicantPortalModule { }
