import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicantComponent } from './applicant.component';
import { LeftSideInfoComponent } from './left-side-info/left-side-info.component';
import { AppliedJobsComponent } from './applied-jobs/applied-jobs.component';
import { SavedJobsComponent } from './saved-jobs/saved-jobs.component';
import { RouterModule } from '@angular/router';
import { ApplicantDashboardComponent } from './applicant-dashboard/applicant-dashboard.component';
import { AppliedJobActionsComponent } from './applied-job-actions/applied-job-actions.component';
import { IdentificationComponent } from './applicant-onboarding/identification/identification.component';
import { DocumentsComponent } from './applicant-onboarding/documents/documents.component';
import { MedicalCheckUpComponent } from './applicant-onboarding/medical-check-up/medical-check-up.component';
import { DependentComponent } from './applicant-onboarding/dependent/dependent.component';
import { AddressComponent } from './applicant-onboarding/address/address.component';
import { EmergencyContactComponent } from './applicant-onboarding/emergency-contact/emergency-contact.component';
import { applicatRoutes } from './applicat.routing';
import { ApplicantOnboardingModule } from './applicant-onboarding/applicant-onboarding.module';
import { MaterialModule } from 'src/app/material/material.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';



@NgModule({
  declarations: [
    ApplicantComponent, 
    LeftSideInfoComponent, 
    AppliedJobsComponent, 
    SavedJobsComponent, 
    ApplicantDashboardComponent, 
    AppliedJobActionsComponent, 
  ],
  imports: [
    RouterModule.forChild(applicatRoutes),
    CommonModule,
    ApplicantOnboardingModule,
    MaterialModule,
    CKEditorModule,
  ]
})
export class ApplicantPortalModule { }
