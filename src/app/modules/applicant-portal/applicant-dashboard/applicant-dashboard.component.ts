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
  token ="AQVVzY645Sk7phH7WkTQiBlhf1JQEeDtkc0hAQfK4LcL_ehhB7V0D13QhjkLK9YZcz2noB7FZzDze86ymoWhrvLYB4rEysduWsS-YhevwurPp7GrKE2fLKnnJJB2EWQFv1zeZdxaPbsS7lEI5KMdGHLUrZrMaShMv7F5MA4SiCMdjH6FV7XvOuUSNI6DS6WpZ1x3dCwzJHyjn72m1J2yd1fvbh0-GDkFDbfUIFl6YZrjGQ0kDl1VJ-is5WEt5j-SFOB1m885L0MBME2CI6v1v59zr-yfBaGN2GNwt9iqTGg6aPTJNq1IxMsp6rtMPkbnHCHhWOPDgDrhQ81CLlLDLeSp6laoNQ";
  constructor(private activatedRoute: ActivatedRoute, private linkedInServive: LinkedInService) {
    this.activatedRoute.queryParams.subscribe(async params => {
      const code = params['code'];
      if (code) {
        this.GetAccessToken(code);
      }
    });
    this.GetLinkedInUserInfo(this.token);
  }
  GetAccessToken(code: string) {
    let url = `https://www.linkedin.com/oauth/v2/saccessToken?grant_type=client_credentials&client_id=${this.clientId
      }&client_secret=${this.clientSecret}&redirect_uri=${this.redirectUrl}&code=${code}`;
    this.linkedInServive.GetAccessToken(url, code, this.redirectUrl).subscribe(res =>
      console.log(res));
  }

  GetLinkedInUserInfo(accessToken: string) {
    this.linkedInServive.GetUserInfoLinkedIn(accessToken).subscribe(res => {
      localStorage.setItem('linkedInUserInfo', JSON.stringify(res));
      this.linkedInServive.GetUserInfoLinkedIn(accessToken).subscribe(
        res => {console.log(res);}
      )
    }
    );
  }
}
