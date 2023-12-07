import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { ForgetpasswordComponent } from './components/forget-password/forget-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { MaterialModule } from '../material/material.module';
import { PasswordResetSuccessComponent } from './components/password-reset-success/password-reset-success.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { SignupModalComponent } from './signup-modal/signup-modal.component';
import { NotificationModalComponent } from './notification-modal/notification-modal.component';
import { RescheduleModalComponent } from './reschedule-modal/reschedule-modal.component';
import { DateValueAccessor } from './directives/date-input-accessor';
import { PasswordStrengthComponent } from '../password-strength/password-strength.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    ForgetpasswordComponent,
    ResetPasswordComponent,
    PasswordResetSuccessComponent,
    SignupModalComponent,
    NotificationModalComponent,
    RescheduleModalComponent,
    DateValueAccessor,
    PasswordStrengthComponent
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
    ForgetpasswordComponent,
    ResetPasswordComponent,
    PasswordStrengthComponent
  ]
})
export class SharedModule { }
