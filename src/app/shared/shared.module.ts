import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ForgetpasswordComponent } from './components/forget-password/forget-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { MaterialModule } from '../material/material.module';
import { PasswordResetSuccessComponent } from './components/password-reset-success/password-reset-success.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { UserInfoModule } from '../modules/user-info/user-info.module';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { SignupModalComponent } from './signup-modal/signup-modal.component';
import { NotificationModalComponent } from './notification-modal/notification-modal.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    ForgetpasswordComponent,
    ResetPasswordComponent,
    PasswordResetSuccessComponent,
    SignupModalComponent,
    NotificationModalComponent,
  ],
  imports: [
    MaterialModule,
    CommonModule,
    CKEditorModule
  ],
  exports:[ 
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    ForgetpasswordComponent,
    ResetPasswordComponent,
  ]
})
export class SharedModule { }
