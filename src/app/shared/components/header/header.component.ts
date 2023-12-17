import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
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
  selectedLanguage:string = 'English';
  defaultImage = 'assets/Images/Profile.png'
  imagePathOrBase64: any;
  
  constructor(
    private router:Router,
    private applicantDataService:ApplicantDataService,
    private service: TranslocoService,
    private _sanitizer: DomSanitizer
    ) { 
      this.applicantDataService.loginEmitter.subscribe(x=> this.UserLogin());
    }

  async ngOnInit() {
    let token = localStorage.getItem('applicantId');
    if(token){
      this.userName = localStorage.getItem('userName') ?? '';
      this.isLogin = true;
    }
    if (this.applicantDataService.applicantData == undefined && token != "") {
      await this.applicantDataService.GetUserInfo();
    }
    if (this.applicantDataService.applicantData?.applicantImage != undefined && this.applicantDataService.applicantData?.applicantImage != "") {
      this.imagePathOrBase64 = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' 
                 + this.applicantDataService.applicantData?.applicantImage);
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
    if(lang == 'en'){
      this.selectedLanguage = 'English'
    }else{
      this.selectedLanguage = 'Arabic - العربية'

    }
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
