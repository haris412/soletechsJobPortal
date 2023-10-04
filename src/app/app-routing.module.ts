import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesEnum } from './shared/enums/routes.enum';
import { ForgetpasswordComponent } from './shared/components/forget-password/forget-password.component';
import { LoginComponent } from './shared/components/login/login.component';
import { ResetPasswordComponent } from './shared/components/reset-password/reset-password.component';
import { PasswordResetSuccessComponent } from './shared/components/password-reset-success/password-reset-success.component';
import { JobsListComponent } from './appcomponents/jobs-list/jobs-list.component';
import { QuickApplyComponent } from './appcomponents/quick-apply/quick-apply.component';
import { LinkedInRedirectComponent } from './modules/linkedIn-redirect/linkedIn-redirect.component';

const routes: Routes = [
  { path: '', component: JobsListComponent },
  { path: RoutesEnum.Jobs, component: JobsListComponent },
  { path: RoutesEnum.QuickApply, component: QuickApplyComponent },
  { path: RoutesEnum.ForgotPassword, component: ForgetpasswordComponent},
  { path: RoutesEnum.ResetPassword, component: ResetPasswordComponent},
  { path: RoutesEnum.Login, component: LoginComponent},
  { path: RoutesEnum.ResetPasswordSuccess, component: PasswordResetSuccessComponent},
  { path: RoutesEnum.LinkedInRedirect, component: LinkedInRedirectComponent},
  { path: RoutesEnum.SignUp, loadChildren: () => import('./modules/sign-up/sign-up.module').then(m => m.SignUpModule)},
  { path: RoutesEnum.Competencies, loadChildren: () => import('./modules/competencies/competencies.module').then(m => m.CompetenciesModule)},
  { path: RoutesEnum.Profile, loadChildren: () => import('./modules/user-info/user-info.module').then(m => m.UserInfoModule)},
  { path: RoutesEnum.Applicant, loadChildren: () => import('./modules/applicant-portal/applicant-portal.module').then(m => m.ApplicantPortalModule)},

  
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
