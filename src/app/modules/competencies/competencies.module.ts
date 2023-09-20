import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses/courses.component';
import { PositionoftrustComponent } from './positionoftrust/positionoftrust.component';
import { CertificatesComponent } from './certificates/certificates.component';




@NgModule({
  declarations: [
  
    CoursesComponent,
       PositionoftrustComponent,
       CertificatesComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
  ],
  providers: [],
})
export class CompetenciesModule { }
