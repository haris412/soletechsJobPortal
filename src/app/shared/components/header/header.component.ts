import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { AppInitiatorService } from 'src/app/app-services/app-initiator-service';
import { TranslationAlignmentService } from 'src/app/app-services/translation-alignment.service';
import { ApplicantDataService } from 'src/app/modules/applicant-portal/services/applicant-shared.service';
import { LinkedInService } from 'src/app/modules/applicant-portal/services/linkedin.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLogin: boolean = false;
  userName: string = '';
  selectedLanguage: string = 'English';
  defaultImage = 'assets/Images/default-image.png'
  userImage:string = 'assets/Images/default-image.png'
  savedJobs:boolean = false;
  home:boolean = true;
  public isTranslate: boolean = false;
  constructor(
    private router: Router,
    public applicantDataService: ApplicantDataService,
    private service: TranslocoService,
    private _sanitizer: DomSanitizer,
    public translationService: TranslationAlignmentService,
    public linkedInServive: LinkedInService,
    public appInitiatorService: AppInitiatorService
  ) {
    this.applicantDataService.loginEmitter.subscribe(x => this.UserLogin());
    this.translationService.languageChange.subscribe(x => {
      {
        this.isTranslate = x;
        if (x) {
          this.userName = this.applicantDataService.applicantData?.firstNameAr ? this.applicantDataService.applicantData?.firstNameAr : localStorage.getItem('userName');
        } else {
          this.userName = localStorage.getItem('userName') ?? '';
        }
      }
    });
  }

  async ngOnInit() {
    if (localStorage.getItem("isArabic") != undefined) {
      if (localStorage.getItem("isArabic") == "false") {
        this.Change("en");
      } else {
        this.Change("nl");
      }
    }
    let token = localStorage.getItem('applicantId');
    if (token) {
      this.userName = this.applicantDataService?.applicantData?.firstName ?? '';
      this.isLogin = true;
    }
    if (this.applicantDataService.applicantData == undefined && token != "") {
      await this.applicantDataService.GetUserInfo();
      this.UserLogin();
    }
    if (this.applicantDataService.applicantData?.applicantImage != undefined && this.applicantDataService.applicantData?.applicantImage != "") {
      this.applicantDataService.applicantImage = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
        + this.applicantDataService.applicantData?.applicantImage);
    }
  }

  Login() {
    this.router.navigate(['/login']);
  }
  UserLogin() {
    let token = localStorage.getItem('applicantId');
    if (token) {
      if (this.translationService.isTranslate) {
        let usrAr = this.applicantDataService?.applicantData?.firstNameAr ?? '';
        this.userName =  usrAr ? usrAr :  this.applicantDataService?.applicantData?.firstName ?? '';
      } else {
        this.userName = this.applicantDataService?.applicantData?.firstName ?? '';
      } 
      this.isLogin = true;
    }
  }
  UserNameLanguage() {
    if (this.translationService.isTranslate) {
      let usrAr = this.applicantDataService?.applicantData?.firstNameAr ?? '';
      this.userName =  usrAr ? usrAr :  this.applicantDataService?.applicantData?.firstName ?? '';
    } else {
      this.userName = this.applicantDataService?.applicantData?.firstName ?? '';
    } 
  }
  Change(lang: string) {
    // Ensure new active lang is loaded
    if (lang == 'en') {
      this.selectedLanguage = 'English';
      this.translationService.languageChange.emit(false);
      this.translationService.isTranslate = false;
      document.documentElement.style.setProperty('--font-regular', 'Poppins-Regular');
      document.documentElement.style.setProperty('--font-medium', 'Poppins-Medium');
      document.documentElement.style.setProperty('--font-semibold', 'Poppins-SemiBold');
      document.documentElement.style.setProperty('--font-bold', 'Poppins-Bold');
      document.documentElement.style.setProperty('--h2-size', '2.25rem');
      document.documentElement.style.setProperty('--h3-size', '1.875rem');
      document.documentElement.style.setProperty('--h4-size', '1.5rem');
      document.documentElement.style.setProperty('--h5-size', '1.125rem');
      document.documentElement.style.setProperty('--h6-size', '1rem');
      document.documentElement.style.setProperty('--p-size', '0.875remrem');
      localStorage.setItem('isArabic', "false");
    } else {
      this.selectedLanguage = 'Arabic - العربية'
      this.translationService.languageChange.emit(true);
      this.translationService.isTranslate = true;
      document.documentElement.style.setProperty('--font-regular', 'Arabic-Regular');
      document.documentElement.style.setProperty('--font-medium', 'Arabic-Medium');
      document.documentElement.style.setProperty('--font-semibold', 'Arabic-SemiBold');
      document.documentElement.style.setProperty('--font-bold', 'Arabic-SemiBold');
      document.documentElement.style.setProperty('--h2-size', '2.625rem');
      document.documentElement.style.setProperty('--h3-size', '2.25rem');
      document.documentElement.style.setProperty('--h4-size', '1.875rem');
      document.documentElement.style.setProperty('--h5-size', '1.5rem');
      document.documentElement.style.setProperty('--h6-size', '1.125rem');
      document.documentElement.style.setProperty('--p-size', '1rem');
      localStorage.setItem('isArabic', "true");
    }
    this.service.setActiveLang(lang);

  }
  OpenProfile() {
    this.router.navigate(['/user-profile']);
  }
  LogOut() {
    var token = localStorage.getItem('token') ?? "";
    localStorage.clear();
    localStorage.setItem('token', token);
    this.isLogin = false;
    this.router.navigate(['/']);
  }
  SavedJobs() {
    this.savedJobs = true;
    this.home = false;
    this.router.navigate(['/applicant/dashboard']);
  }
  GoToJobs() {
    this.savedJobs = false;
    this.home = true;
    this.router.navigate(['/']);
  }
  GoToHome(){
    this.savedJobs = false;
    this.home = true;
    this.router.navigate(['/']);
  }
}
