import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicantDataService } from 'src/app/modules/applicant-portal/services/applicant-shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLogin:boolean = false;
  constructor(
    private router:Router,
    private applicantDataService:ApplicantDataService
    ) { 
      this.applicantDataService.loginEmitter.subscribe(x=> this.isLogin = true);
    }

  ngOnInit(): void {
    let token = localStorage.getItem('token');
    if(token){
      this.isLogin = true;
    }
  }

  Login(){
    this.router.navigate(['/login']);
  }
  OpenProfile(){
    this.router.navigate(['/user-profile']);
  }
  LogOut(){
    localStorage.clear();
    this.isLogin = false;
    this.router.navigate(['/']);
  }
  SavedJobs(){
    this.router.navigate(['/applicant/dashboard']);
  }
}
