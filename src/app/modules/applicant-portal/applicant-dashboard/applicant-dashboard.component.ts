import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LinkedInService } from '../services/linkedin.service';

@Component({
  selector: 'app-applicant-dashboard',
  templateUrl: './applicant-dashboard.component.html',
  styleUrls: ['./applicant-dashboard.component.scss']
})
export class ApplicantDashboardComponent {

  clientId:string= '';
  clientSecret:string = '';
  code:string = '';
  url = 'https://www.linkedin.com/oauth/accessToken';
  constructor(private activatedRoute:ActivatedRoute , private linkedInServive:LinkedInService ){
    debugger;
    this.activatedRoute.queryParams.subscribe(async params => {
      const code = params['code'];
      console.log(code);
     });
  }
  GetAccessToken(){
    this.linkedInServive.GetAccessToken(this.url , this.code).subscribe( res => 
      console.log(res));
  }
}
