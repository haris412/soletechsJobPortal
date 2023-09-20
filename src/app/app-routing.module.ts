import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesEnum } from './shared/enums/routes.enum';
import { ForgetpasswordComponent } from './shared/components/forget-password/forget-password.component';
import { LoginComponent } from './shared/components/login/login.component';
import { ResetPasswordComponent } from './shared/components/reset-password/reset-password.component';
import { PasswordResetSuccessComponent } from './shared/components/password-reset-success/password-reset-success.component';
import { JobsListComponent } from './appcomponents/jobs-list/jobs-list.component';

const routes: Routes = [
  { path: '', component: JobsListComponent },
  { path: RoutesEnum.ForgotPassword, component: ForgetpasswordComponent},
  { path: RoutesEnum.ResetPassword, component: ResetPasswordComponent},
  { path: RoutesEnum.Login, component: LoginComponent},
  { path: RoutesEnum.ResetPasswordSuccess, component: PasswordResetSuccessComponent},
  { path: RoutesEnum.SignUp, loadChildren: () => import('./modules/sign-up/sign-up.module').then(m => m.SignUpModule)},
  { path: RoutesEnum.Competencies, loadChildren: () => import('./modules/competencies/competencies.module').then(m => m.CompetenciesModule)},
  { path: RoutesEnum.Profile, loadChildren: () => import('./modules/user-info/user-info.module').then(m => m.UserInfoModule)}
  
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
