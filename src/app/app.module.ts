import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JobsComponent } from './appcomponents/jobs/jobs.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { MaterialModule } from './material/material.module';
import { JobsListComponent } from './appcomponents/jobs-list/jobs-list.component';
import { AddEditBasicinformationComponent } from './appcomponents/add-edit-basicinformation/add-edit-basicinformation.component';
import { AddEditEducationComponent } from './appcomponents/add-edit-education/add-edit-education.component';
import { AddEditExperienceComponent } from './appcomponents/add-edit-experience/add-edit-experience.component';
import { AddEditPortfolioComponent } from './appcomponents/add-edit-portfolio/add-edit-portfolio.component';
import { AddEditSkillsComponent } from './appcomponents/add-edit-skills/add-edit-skills.component';
import { AddEditProfileComponent } from './appcomponents/add-edit-profile/add-edit-profile.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  declarations: [
    AppComponent,
    JobsComponent,
    JobsListComponent,
    AddEditBasicinformationComponent,
    AddEditEducationComponent,
    AddEditExperienceComponent,
    AddEditPortfolioComponent,
    AddEditSkillsComponent,
    AddEditProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    MaterialModule,
    CKEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
