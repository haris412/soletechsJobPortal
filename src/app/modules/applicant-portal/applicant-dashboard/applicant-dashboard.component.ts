import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LinkedInService } from '../services/linkedin.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-applicant-dashboard',
  templateUrl: './applicant-dashboard.component.html',
  styleUrls: ['./applicant-dashboard.component.scss']
})
export class ApplicantDashboardComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, 
    public linkedInServive: LinkedInService,
    private route: Router) {
  }
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(async params => {
      const code = params['code'];
      if (code) {
        this.GetAccessToken(code);
      }
    });
  }
  GetAccessToken(code: string) {

    let url = `client_id=${environment.clientId}&client_secret=${environment.clientSecret
               }&redirect_uri=${environment.redirect_uri}&code=${code}`;
    this.linkedInServive.GetAccessToken(url).subscribe(res => {
      if (res != null && res.access_token != undefined && res.access_token != "invalid_request") {
        this.linkedInServive.accessToken = res.access_token;
        this.GetLinkedInUserInfo();
      } else {
        this.route.navigateByUrl('/');
      }
    });
  }

  GetLinkedInUserInfo() {
    this.linkedInServive.GetUserInfoLinkedIn().subscribe(res => {
      localStorage.setItem('linkedInUserInfo', JSON.stringify(res));
      this.linkedInServive.userInfo = res;
    }
    );
  }
}
