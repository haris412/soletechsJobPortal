import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApplicantDataService } from 'src/app/modules/applicant-portal/services/applicant-shared.service';
import { LoginService } from '../../services/login.service';
import { Login } from 'src/app/models/login.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  linkedInCredentials = {
    clientId: "86ykg7fe4magrl",
    redirectUrl: "http://localhost:4200/linkedin-redirect",
    scope: ['openid', 'profile', 'email']
  };
  loginForm: UntypedFormGroup;
  private _formBuilder = inject(UntypedFormBuilder);
  constructor(private router:Router , 
              private service:ApplicantDataService,
              private loginService:LoginService,
              private toastrService: ToastrService) {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
  });   
}

  ngOnInit(): void {
  }
  ForgotPassword(){
    this.router.navigate(['/forgot-password']);
  }
  SignUp(){
    this.router.navigate(['/sign-up']);
  }

  async Login(){

    if (this.loginForm.valid) {
      let loginData: Login = {
        ...this.loginForm.value,
        loginType: 0
      }
      let response = await this.loginService.Login(loginData);
      if (response?.Status) {
        localStorage.setItem('userInfo', this.loginForm.getRawValue());
        localStorage.setItem('recId', response?.Recid);
        localStorage.setItem("applicantId", response?.applicantId);
        this.service.loginEmitter.emit(true);
        this.router.navigate(['/applicant']);
      }else{
        this.toastrService.error(response?.Message);
      }
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

}
