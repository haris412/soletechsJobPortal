import { Component, NgZone, OnInit, inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApplicantDataService } from 'src/app/modules/applicant-portal/services/applicant-shared.service';
import { LoginService } from '../../services/login.service';
import { Login } from 'src/app/models/login.model';
import { ToastrService } from 'ngx-toastr';
import { AppLookUpService } from 'src/app/app-services/app-look-up.service';
import { TranslationAlignmentService } from 'src/app/app-services/translation-alignment.service';
import { CredentialResponse  } from 'google-one-tap';
import { SocialUser } from 'angularx-social-login';
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
  user!: SocialUser;

  showOtp: boolean = false;
  public isTranslate: boolean = this.translationService.isTranslate;
  display: any;
  public timerInterval: any;
  otpEntered: boolean = true;
  private _formBuilder = inject(UntypedFormBuilder);
  get f() { return this.loginForm.controls; }
  isViewingPassword: boolean = false;

  password:string = 'password';
  constructor(private router: Router,
    private service: ApplicantDataService,
    private loginService: LoginService,
    private toastrService: ToastrService,
    private lookupService: AppLookUpService,
    public translationService: TranslationAlignmentService,
    private _ngZone:NgZone) {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
    this.otpForm = this._formBuilder.group({
      otp: [, [Validators.required]],
    });
    this.translationService.languageChange.subscribe( x=> {
      this.isTranslate  = x;
    });
  }


  ngOnInit(): void {
    
  }
  ForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }
  SignUp() {
    this.router.navigate(['/sign-up']);
  }

  async Login() {

    if (this.loginForm.valid) {
      let loginData: Login = {
        ...this.loginForm.value,
        loginType: 0
      }
      let response = await this.loginService.Login(loginData);
      if (response?.status) {
        this.toastrService.success(response?.Message);
        this.showOtp = true;
        this.timer(5);
        this.otpEntered = true;
      } else {
        this.toastrService.error(response?.Message);
      }
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
  async VerifyOtp() {
    if (this.otpForm.valid) {
      this.otpEntered = false
      let response = await this.lookupService.VerifyOTP(this.otpForm.value)
      if (response?.Status) {
        localStorage.setItem('email', response?.Email);
        localStorage.setItem("applicantId", response?.ApplicantId);
        localStorage.setItem("applicantPersonRecid", response?.ApplicantPersonRecid);
        localStorage.setItem("recId", response?.recid);
        this.service.loginEmitter.emit(true);
        this.router.navigate(['/applicant']);
      } else {
        this.toastrService.error(response?.Message);
      }
    } else {
      this.otpForm.markAllAsTouched();
    }
  }

  async resendOTP() {
    await this.lookupService.ResendOTP(this.loginForm.controls.email.value);
    clearInterval(this.timerInterval);
    this.timer(5);
    this.otpEntered = true;
  }

  timer(minute: any) {
    // let minute = 1;
    let seconds: number = minute * 60;
    let textSec: any = '0';
    let statSec: number = 60;

    const prefix = minute < 10 ? '0' : '';

    this.timerInterval = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 59;

      if (statSec < 10) {
        textSec = '0' + statSec;
      } else textSec = statSec;

      this.display = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;

      if (seconds == 0) {
        clearInterval(this.timerInterval);
      }
    }, 1000);
  }
  LoginWithGoogle(){
      this.signInWithGoogle();
  }
  async HandleCredentialsResponse(response:CredentialResponse){
    // await this.service.LoginWithGoogle(response.crdentai)
  }
  async signInWithGoogle() {
  }
  GoogleResponse(response:any){
  }
  ViewPassword(){
    if (this.password === 'password') {
      this.password = 'text';
    } else {
      this.password = 'password';
    }
    this.isViewingPassword = !this.isViewingPassword;
    
  }
}
