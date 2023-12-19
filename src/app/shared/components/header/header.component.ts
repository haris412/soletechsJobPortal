import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
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
  defaultImage = 'assets/Images/Profile.png'
  imagePathOrBase64: any;
  userImage:string = 'assets/Images/Profile.png';

  public isTranslate: boolean = false;
  constructor(
    private router: Router,
    private applicantDataService: ApplicantDataService,
    private service: TranslocoService,
    private _sanitizer: DomSanitizer,
    private languageService: TranslationAlignmentService,
    public translationService: TranslationAlignmentService,
    public linkedInServive: LinkedInService,

  ) {
    this.applicantDataService.loginEmitter.subscribe(x => this.UserLogin());
    this.translationService.languageChange.subscribe(x => {
      {
        this.isTranslate = x;
      }
    });
  }

  async ngOnInit() {
    let token = localStorage.getItem('applicantId');
    if (token) {
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

  Login() {
    this.router.navigate(['/login']);
  }
  UserLogin() {
    this.isLogin = true;
    let token = localStorage.getItem('applicantId');
    if (token) {
      this.userName = localStorage.getItem('userName') ?? '';
      this.isLogin = true;
    }
  }
  Change(lang: string) {
    // Ensure new active lang is loaded
    if (lang == 'en') {
      this.selectedLanguage = 'English';
      this.languageService.languageChange.emit(false);
      this.languageService.isTranslate = false;
      document.documentElement.style.setProperty('--font-regular', 'Poppins-Regular');
      document.documentElement.style.setProperty('--font-medium', 'Poppins-Medium');
      document.documentElement.style.setProperty('--font-semi', 'Poppins-SemiBold');
      document.documentElement.style.setProperty('--font-bold', 'Poppins-Bold');
    } else {
      this.selectedLanguage = 'Arabic - العربية'
      this.languageService.languageChange.emit(true);
      this.translationService.isTranslate = true;
      document.documentElement.style.setProperty('--font-regular', 'Arabic-Regular');
      document.documentElement.style.setProperty('--font-medium', 'Arabic-Medium');
      document.documentElement.style.setProperty('--font-semi', 'Arabic-SemiBold');
      document.documentElement.style.setProperty('--font-bold', 'Arabic-SemiBold');
    }
    this.service.setActiveLang(lang);

  }
  OpenProfile() {
    this.router.navigate(['/user-profile']);
  }
  LogOut() {
    localStorage.clear();
    this.isLogin = false;
    this.router.navigate(['/']);
  }
  SavedJobs() {
    this.router.navigate(['/applicant/dashboard']);
  }
  GoToJobs() {
    this.router.navigate(['/']);
  }
}
