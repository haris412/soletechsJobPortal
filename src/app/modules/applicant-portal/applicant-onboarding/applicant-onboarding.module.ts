import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AddressComponent } from './address/address.component';
import { DependentComponent } from './dependent/dependent.component';
import { DocumentsComponent } from './documents/documents.component';
import { EmergencyContactComponent } from './emergency-contact/emergency-contact.component';
import { IdentificationComponent } from './identification/identification.component';
import { MedicalCheckUpComponent } from './medical-check-up/medical-check-up.component';
import { ApplicantOnboardingComponent } from './applicant-onboarding.component';
import { MaterialModule } from 'src/app/material/material.module';
import { CareerPageTaskBasicComponent } from './careerPageTaskBasic.ts/careerPageTaskBasic.component';
import { CompetenciesCommonModule } from '../../competencies-common/competencies-common.module';
import { BasicInfoCommonModule } from '../../basic-info-common-module/basic-info-common.module';
import { TranslocoRootModule } from 'src/app/transloco-root.module';



@NgModule({
  declarations: [
    AddressComponent,
    DependentComponent,
    DocumentsComponent,
    EmergencyContactComponent,
    IdentificationComponent,
    MedicalCheckUpComponent,
    ApplicantOnboardingComponent,
    CareerPageTaskBasicComponent
  ],
  imports: [
    TranslocoRootModule,
    CommonModule,
    MaterialModule,
    CompetenciesCommonModule,
    BasicInfoCommonModule
  ],
  providers: [DatePipe],
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
