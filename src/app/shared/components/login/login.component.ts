import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  linkedInCredentials = {
    clientId: "777bzfj95l5sli",
    redirectUrl: "http://localhost:4200/linkedin-redirect",
    scope: "" // To read basic user profile data and email
  };

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  ForgotPassword(){
    this.router.navigate(['/forgot-password']);
  }
  SignUp(){
    this.router.navigate(['/sign-up']);
  }
  loginWithLinkedIn() {
    let url = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${
      this.linkedInCredentials.clientId
    }&redirect_uri=${this.linkedInCredentials.redirectUrl}&scope=${this.linkedInCredentials.scope}`;
    window.open(url, "_blank");
  }
}
