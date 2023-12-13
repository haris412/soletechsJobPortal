import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { ApplicantDataService } from 'src/app/modules/applicant-portal/services/applicant-shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLogin:boolean = false;
  userName:string = '';
  constructor(
    private router:Router,
    private applicantDataService:ApplicantDataService,
    private service: TranslocoService
    ) { 
      this.applicantDataService.loginEmitter.subscribe(x=> this.UserLogin());
    }

  ngOnInit(): void {
    let token = localStorage.getItem('applicantId');
    if(token){
      this.userName = localStorage.getItem('userName') ?? '';
      this.isLogin = true;
    }
  }

  Login(){
    this.router.navigate(['/login']);
  }
  UserLogin(){
    this.isLogin = true;
    let token = localStorage.getItem('applicantId');
    if(token){
      this.userName = localStorage.getItem('userName') ?? '';
      this.isLogin = true;
    }
  }
  Change(lang: string) {
    // Ensure new active lang is loaded
    this.service.setActiveLang(lang);
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
  GoToJobs(){
    this.router.navigate(['/']);
  }
}
