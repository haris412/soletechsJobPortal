import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApplicantDataService } from 'src/app/modules/applicant-portal/services/applicant-shared.service';
import { LoginService } from '../../services/login.service';
import { Login } from 'src/app/models/login.model';
import { ToastrService } from 'ngx-toastr';
import { AppLookUpService } from 'src/app/app-services/app-look-up.service';

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
  otpForm: UntypedFormGroup;

  showOtp:boolean = false;
  private _formBuilder = inject(UntypedFormBuilder);
  get f() { return this.loginForm.controls; }
  constructor(private router:Router , 
              private service:ApplicantDataService,
              private loginService:LoginService,
              private toastrService: ToastrService,
              private lookupService:AppLookUpService) {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
  });
  this.otpForm = this._formBuilder.group({
    otp: [, [Validators.required]],
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
      if (response?.status) {
        this.toastrService.success(response?.Message);
        this.showOtp = true;
      }else{
        this.toastrService.error(response?.Message);
      }
    } else {
       this.loginForm.markAllAsTouched();
    }
  }
  async VerifyOtp(){
    if (this.otpForm.valid) {
      let response = await this.lookupService.VerifyOTP(this.otpForm.value)
      if (response?.Status) {
        localStorage.setItem('userName', response?.UserName);
        localStorage.setItem('email', response?.Email);
        localStorage.setItem("applicantId", response?.ApplicantId);
        localStorage.setItem("applicantPersonRecid", response?.ApplicantPersonRecid);
        localStorage.setItem("recId", response?.recid);
        this.service.loginEmitter.emit(true);
        this.router.navigate(['/applicant']);
      }
    } else {
      this.otpForm.markAllAsTouched();
    }
  }

}
