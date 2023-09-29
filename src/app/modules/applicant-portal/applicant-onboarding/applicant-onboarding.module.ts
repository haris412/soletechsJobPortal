import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressComponent } from './address/address.component';
import { DependentComponent } from './dependent/dependent.component';
import { DocumentsComponent } from './documents/documents.component';
import { EmergencyContactComponent } from './emergency-contact/emergency-contact.component';
import { IdentificationComponent } from './identification/identification.component';
import { MedicalCheckUpComponent } from './medical-check-up/medical-check-up.component';
import { ApplicantOnboardingComponent } from './applicant-onboarding.component';



@NgModule({
  declarations: [
    AddressComponent,
    DependentComponent,
    DocumentsComponent,
    EmergencyContactComponent,
    IdentificationComponent,
    MedicalCheckUpComponent,
    ApplicantOnboardingComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AddressComponent,
    DependentComponent,
    DocumentsComponent,
    EmergencyContactComponent,
    IdentificationComponent,
    MedicalCheckUpComponent
  ]
})
export class ApplicantOnboardingModule { }
