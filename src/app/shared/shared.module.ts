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
import { BlockCopyPasteDirective } from './directives/appBlockCopyPaste.directive';
import { TranslocoRootModule } from '../transloco-root.module';
import { PreventArabicDirective } from './directives/arabic.directive';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { OfferModalComponent } from './offer-modal/offer-modal.component';
import { RejectOfferComponent } from './reject-offer/reject-offer.component';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { DialogComponent } from './components/dialog/dialog.component';



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
    PasswordStrengthComponent,
    BlockCopyPasteDirective,
    PreventArabicDirective,
    DeleteModalComponent,
    OfferModalComponent,
    RejectOfferComponent,
    ConfirmationModalComponent,
    DialogComponent
  ],
  imports: [
    MaterialModule,
    TranslocoRootModule,
    CommonModule,
    CKEditorModule
  ],
  exports:[ 
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    ForgetpasswordComponent,
    ResetPasswordComponent,
    PasswordStrengthComponent,
    BlockCopyPasteDirective,
    ConfirmationModalComponent,
    PreventArabicDirective,
    DialogComponent
  ]
})
export class SharedModule { }
