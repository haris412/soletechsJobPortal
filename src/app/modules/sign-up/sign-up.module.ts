import { NgModule } from '@angular/core';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MaterialModule } from 'src/app/material/material.module';
import { SignUpComponent } from './sign-up.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SignupRoutes } from './sign-up-routing';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SignUpComponent
  ],
  imports: [
    RouterModule.forChild(SignupRoutes),
    CommonModule,
    MaterialModule,
    CKEditorModule
  ],
  exports:[
    SignUpComponent
  ],
  providers: [],
})
export class SignUpModule { }
