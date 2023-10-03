import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile.component';
import { SignUpModule } from '../sign-up/sign-up.module';
import { UserInfoModule } from '../user-info/user-info.module';
import { CompetenciesModule } from '../competencies/competencies.module';
import { UserProfileRoutes } from './user-profile-routing';
import { RouterModule } from '@angular/router';
import { SignupComponent } from 'src/app/shared/components/signup/signup.component';
import { MaterialModule } from 'src/app/material/material.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import { RightContentComponent } from './right-content/right-content.component';



@NgModule({
  declarations: [
    UserProfileComponent,
    LeftMenuComponent,
    RightContentComponent
  ],
  imports: [
    RouterModule.forChild(UserProfileRoutes),
    CommonModule,
    MaterialModule,
    CKEditorModule,

  ]
})
export class UserProfileModule { }
