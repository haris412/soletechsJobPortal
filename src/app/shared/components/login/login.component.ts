import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApplicantDataService } from 'src/app/modules/applicant-portal/services/applicant-shared.service';

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
  constructor(private router:Router , private service:ApplicantDataService) {
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

  Login:() => void = () => {
    if(this.loginForm.valid){
    localStorage.setItem('token', '3232132#3233#$$#$#%#$3$#@$');
    localStorage.setItem('userInfo', this.loginForm.getRawValue());
    this.service.loginEmitter.emit(true);
    this.router.navigate(['/applicant']);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
  
}
