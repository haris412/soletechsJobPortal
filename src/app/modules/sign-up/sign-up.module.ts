import { NgModule } from '@angular/core';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MaterialModule } from 'src/app/material/material.module';
import { SignUpComponent } from './sign-up.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SignupRoutes } from './sign-up-routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslocoRootModule } from 'src/app/transloco-root.module';

@NgModule({
  declarations: [
    SignUpComponent
  ],
  imports: [
    TranslocoRootModule,
    RouterModule.forChild(SignupRoutes),
    CommonModule,
    MaterialModule,
    CKEditorModule,
    SharedModule
  ],
  exports:[
    SignUpComponent
  ],
  providers: [],
})
export class SignUpModule { }
