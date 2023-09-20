import { NgModule } from '@angular/core';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MaterialModule } from 'src/app/material/material.module';
import { SignUpComponent } from './sign-up.component';
import { UserInfoModule } from '../user-info/user-info.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SignupRoutes } from './sign-up-routing';

@NgModule({
  declarations: [
    SignUpComponent
  ],
  imports: [
    RouterModule.forChild(SignupRoutes),
    CommonModule,
    // UserInfoModule,
    MaterialModule,
    CKEditorModule
  ],
  exports:[],
  providers: [],
})
export class SignUpModule { }
