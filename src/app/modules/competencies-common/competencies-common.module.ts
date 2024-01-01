import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompetenciesCommonComponent } from './competencies-common.component';
import { TranslocoRootModule } from 'src/app/transloco-root.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';
import { ToastrModule } from 'ngx-toastr';
import { MaterialModule } from 'src/app/material/material.module';
import { AddEditCertificatesComponent } from './components/add-edit-certificates/add-edit-certificates.component';
import { AddEditCoursesComponent } from './components/add-edit-courses/add-edit-courses.component';
import { AddEditEducationComponent } from './components/add-edit-education/add-edit-education.component';
import { AddEditExperienceComponent } from './components/add-edit-experience/add-edit-experience.component';
import { AddEditPositionOfTrustComponent } from './components/add-edit-position-of-trust/add-edit-position-of-trust.component';
import { AddEditSkillsComponent } from './components/add-edit-skills/add-edit-skills.component';
import { EducationComponent } from './components/education/education.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { SkillsComponent } from './components/skills/skills.component';
import { CertificatesComponent } from './components/certificates/certificates.component';
import { CoursesComponent } from './components/courses/courses.component';
import { PositionoftrustComponent } from './components/positionoftrust/positionoftrust.component';

@NgModule({
  imports: [
    TranslocoRootModule,
    MaterialModule,
    CKEditorModule,
    CommonModule,
    NgxMatIntlTelInputComponent,
    ToastrModule.forRoot(),
    CommonModule
  ],
  declarations: [AddEditEducationComponent,
    AddEditExperienceComponent,
    AddEditSkillsComponent,
    SkillsComponent,
    EducationComponent,
    ExperienceComponent,
    AddEditCertificatesComponent,
    AddEditPositionOfTrustComponent,
    AddEditCoursesComponent,
    CertificatesComponent,
    CoursesComponent,
    PositionoftrustComponent
  ],
    exports : [
      AddEditEducationComponent,
      AddEditExperienceComponent,
      AddEditSkillsComponent,
      SkillsComponent,
      EducationComponent,
      ExperienceComponent,
      AddEditCertificatesComponent,
      AddEditPositionOfTrustComponent,
      AddEditCoursesComponent,
      CertificatesComponent,
      CoursesComponent,
      PositionoftrustComponent
    ]
})
export class CompetenciesCommonModule { }
