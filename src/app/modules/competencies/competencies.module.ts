import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses/courses.component';
import { PositionoftrustComponent } from './positionoftrust/positionoftrust.component';
import { CertificatesComponent } from './certificates/certificates.component';
import { CompetenciesComponent } from './competencies.component';
import { AddEditEducationComponent } from '../competencies/add-edit-education/add-edit-education.component';
import { AddEditExperienceComponent } from '../competencies/add-edit-experience/add-edit-experience.component';
import { AddEditSkillsComponent } from '../competencies/add-edit-skills/add-edit-skills.component';
import { CompetenciesRoutes } from './competencies-routing.module';
import { RouterModule } from '@angular/router';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MaterialModule } from 'src/app/material/material.module';
import { SkillsComponent } from './skills/skills.component';
import { EducationComponent } from './education/education.component';
import { ExperienceComponent } from './experience/experience.component';
import { AddEditCertificatesComponent } from './add-edit-certificates/add-edit-certificates.component';
import { AddEditPositionOfTrustComponent } from './add-edit-position-of-trust/add-edit-position-of-trust.component';
import { AddEditCoursesComponent } from './add-edit-courses/add-edit-courses.component';


@NgModule({
  declarations: [
    CoursesComponent,
    PositionoftrustComponent,
    CertificatesComponent,
    CompetenciesComponent,
    AddEditEducationComponent,
    AddEditExperienceComponent,
    AddEditSkillsComponent,
    SkillsComponent,
    EducationComponent,
    ExperienceComponent,
    AddEditCertificatesComponent,
    AddEditPositionOfTrustComponent,
    AddEditCoursesComponent,
  ],
  imports: [
    RouterModule.forChild(CompetenciesRoutes),
    MaterialModule,
    CKEditorModule,
    CommonModule,
  ],
  exports: [
    AddEditEducationComponent,
    AddEditExperienceComponent,
    AddEditSkillsComponent,
  ],
  providers: [],
})
export class CompetenciesModule { }
