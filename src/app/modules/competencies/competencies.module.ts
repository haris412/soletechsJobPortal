import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses/courses.component';
import { PositionoftrustComponent } from './positionoftrust/positionoftrust.component';
import { CertificatesComponent } from './certificates/certificates.component';
import { CompetenciesComponent } from './competencies.component';
import { CompetenciesRoutes } from './competencies-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CoursesComponent,
       PositionoftrustComponent,
       CertificatesComponent,
       CompetenciesComponent
  ],
  imports: [
    RouterModule.forChild(CompetenciesRoutes),
    CommonModule
  ],
  exports:[
  ],
  providers: [],
})
export class CompetenciesModule { }
