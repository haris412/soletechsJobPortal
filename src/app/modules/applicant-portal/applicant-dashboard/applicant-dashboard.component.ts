import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LinkedInService } from '../services/linkedin.service';

@Component({
  selector: 'app-applicant-dashboard',
  templateUrl: './applicant-dashboard.component.html',
  styleUrls: ['./applicant-dashboard.component.scss']
})
export class ApplicantDashboardComponent {

  clientId: string = '86ykg7fe4magrl';
  clientSecret: string = '9WRk82y2qSNdOKej';
  code: string = '';
  redirectUrl: string = "http://localhost:4200/applicant/dashboard";
  url = 'https://www.linkedin.com/oauth/accessToken';
  constructor(private activatedRoute: ActivatedRoute, private linkedInServive: LinkedInService) {
    this.activatedRoute.queryParams.subscribe(async params => {
      const code = params['code'];
      if (code) {
        this.GetAccessToken(code);
      }
    });
  }
  GetAccessToken(code: string) {
    let url = `https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&client_id=${this.clientId
      }&client_secret=${this.clientSecret}&redirect_uri=${this.redirectUrl}&code=${code}`;
    this.linkedInServive.GetAccessToken(url, code, this.redirectUrl).subscribe(res =>
      console.log(res));
  }

  GetLinkedInUserInfo(accessToken: string) {
    this.linkedInServive.GetUserInfoLinkedIn(accessToken).subscribe(res => {
      localStorage.setItem('linkedInUserInfo', JSON.stringify(res));
      console.log(res);
    }
    );
  }
}
