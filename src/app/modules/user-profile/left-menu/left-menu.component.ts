import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { ApplicantDataService } from '../../applicant-portal/services/applicant-shared.service';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss']
})
export class LeftMenuComponent implements OnInit {
  public isBasicInfo: boolean = true;
  public about: boolean = false;
  public cv: boolean = false;
  public competencies: boolean = false;
  public profile: boolean = false;
  public notifications: boolean = false;
  public deactivate: boolean = false;
  public completed: boolean = false;
  public sidenavOpen: boolean = false;
  public isActive: boolean = false;
  public isBasicActive: boolean = false;
  public isContactActive: boolean = false;
  public isAddressActive: boolean = false;
  public isIdentificationActive: boolean = false;
  public basicCompleted: boolean = false;
  public contactCompleted: boolean = false;
  public addressCompleted: boolean = false;
  public identificationCompleted: boolean = false;
  public skillCompleted: boolean = false;
  public skillsisActive: boolean = false;
  public experienceCompleted: boolean = false;
  public experienceisActive: boolean = false;
  public educationCompleted: boolean = false;
  public educationisActive: boolean = false;
  public coursesCompleted: boolean = false;
  public coursesisActive: boolean = false;
  public certificatescompleted: boolean = false;
  public certificatesisActive: boolean = false;
  public positionOfTrustcompleted: boolean = false;
  public positionOfTrustisActive: boolean = false;
  index: number = 0;
  competencyIndex: number = 0;
  @Input() isTranslate: boolean = false;
  @Output() scrollTo = new EventEmitter<string>();
  @Output() switchTab = new EventEmitter<number>();
  @Output() switchCompetencyTab = new EventEmitter<number>();

  constructor(public applicantDataService: ApplicantDataService){}
  ngOnInit() {
    this.isActive = this.applicantDataService?.applicantData?.ApplicationStatus;
  }
  ScrolltoTarget(event: any) {
    this.scrollTo.emit(event);
    switch (event) {
      case '#basicInformation': {
        this.isBasicInfo = true;
        this.notifications = false;
        this.deactivate = false;
        this.about = false;
        this.cv = false;
        this.profile = false;
        this.competencies = false;
        this.isBasicActive = false;
        this.isContactActive = false;
        this.isAddressActive = false;
        this.isIdentificationActive = false;
        this.basicCompleted = false;
        this.contactCompleted = false;
        this.addressCompleted = false;
        this.identificationCompleted = false;
        this.skillCompleted = false;
        this.skillsisActive = false;
        this.experienceCompleted = false;
        this.experienceisActive = false;
        this.educationCompleted = false;
        this.educationisActive = false;
        this.coursesCompleted = false;
        this.coursesisActive = false;
        this.certificatescompleted = false;
        this.certificatesisActive = false;
        this.positionOfTrustcompleted = false;
        this.positionOfTrustisActive = false;
        break;
      }
      case '#about': {
        this.isBasicInfo = false;
        this.notifications = false;
        this.deactivate = false;
        this.about = true;
        this.cv = false;
        this.profile = false;
        this.competencies = false;
        this.isBasicActive = false;

        this.isContactActive = false;
        this.isAddressActive = false;
        this.isIdentificationActive = false;
        this.basicCompleted = false;
        this.contactCompleted = false;
        this.addressCompleted = false;
        this.identificationCompleted = false;
        this.skillCompleted = false;
        this.skillsisActive = false;
        this.experienceCompleted = false;
        this.experienceisActive = false;
        this.educationCompleted = false;
        this.educationisActive = false;
        this.coursesCompleted = false;
        this.coursesisActive = false;
        this.certificatescompleted = false;
        this.certificatesisActive = false;
        this.positionOfTrustcompleted = false;
        this.positionOfTrustisActive = false;
        break;
      }
      case '#cv': {
        this.isBasicInfo = false;
        this.notifications = false;
        this.deactivate = false;
        this.about = false;
        this.cv = true;
        this.profile = false;
        this.competencies = false;
        this.isBasicActive = false;
        this.isContactActive = false;
        this.isAddressActive = false;
        this.isIdentificationActive = false;
        this.basicCompleted = false;
        this.contactCompleted = false;
        this.addressCompleted = false;
        this.identificationCompleted = false;
        this.skillCompleted = false;
        this.skillsisActive = false;
        this.experienceCompleted = false;
        this.experienceisActive = false;
        this.educationCompleted = false;
        this.educationisActive = false;
        this.coursesCompleted = false;
        this.coursesisActive = false;
        this.certificatescompleted = false;
        this.certificatesisActive = false;
        this.positionOfTrustcompleted = false;
        this.positionOfTrustisActive = false;
        break;
      }
      case '#profile': {
        this.isBasicInfo = false;
        this.notifications = false;
        this.deactivate = false;
        this.about = false;
        this.cv = false;
        this.profile = true;
        this.competencies = false;
        break;
      }
      case '#competencies': {
        this.isBasicInfo = false;
        this.notifications = false;
        this.deactivate = false;
        this.about = false;
        this.cv = false;
        this.profile = false;
        this.competencies = true;
        break;
      }
      case '#notifications': {
        this.isBasicInfo = false;
        this.notifications = true;
        this.deactivate = false;
        this.about = false;
        this.cv = false;
        this.profile = false;
        this.competencies = false;
        this.isBasicActive = false;
        this.isContactActive = false;
        this.isAddressActive = false;
        this.isIdentificationActive = false;
        this.basicCompleted = false;
        this.contactCompleted = false;
        this.addressCompleted = false;
        this.identificationCompleted = false;
        this.skillCompleted = false;
        this.skillsisActive = false;
        this.experienceCompleted = false;
        this.experienceisActive = false;
        this.educationCompleted = false;
        this.educationisActive = false;
        this.coursesCompleted = false;
        this.coursesisActive = false;
        this.certificatescompleted = false;
        this.certificatesisActive = false;
        this.positionOfTrustcompleted = false;
        this.positionOfTrustisActive = false;
        break;
      }
      case '#deactivate': {
        this.isBasicInfo = false;
        this.notifications = false;
        this.deactivate = true;
        this.about = false;
        this.cv = false;
        this.profile = false;
        this.competencies = false;
        this.isBasicActive = false;
        this.isContactActive = false;
        this.isAddressActive = false;
        this.isIdentificationActive = false;
        this.basicCompleted = false;
        this.contactCompleted = false;
        this.addressCompleted = false;
        this.identificationCompleted = false;
        this.skillCompleted = false;
        this.skillsisActive = false;
        this.experienceCompleted = false;
        this.experienceisActive = false;
        this.educationCompleted = false;
        this.educationisActive = false;
        this.coursesCompleted = false;
        this.coursesisActive = false;
        this.certificatescompleted = false;
        this.certificatesisActive = false;
        this.positionOfTrustcompleted = false;
        this.positionOfTrustisActive = false;
        break;
      }
    }
  }
  GoToTab(index: number) {
    this.ScrolltoTarget('#profile');
    this.index = index;
    if (index === 2) {
      this.isBasicActive = false;
      this.isContactActive = true;
      this.isAddressActive = false;
      this.isIdentificationActive = false;
      this.skillsisActive = false;
      this.experienceisActive = false;
      this.educationisActive = false;
      this.certificatesisActive = false;
      this.coursesisActive = false;
      this.positionOfTrustisActive = false;
    } else if (index === 3) {
      this.isBasicActive = false;
      this.isContactActive = false;
      this.isAddressActive = true;
      this.isIdentificationActive = false;
      this.skillsisActive = false;
      this.experienceisActive = false;
      this.educationisActive = false;
      this.certificatesisActive = false;
      this.coursesisActive = false;
    } else if (index === 4) {
      this.isBasicActive = false;
      this.isContactActive = false;
      this.isAddressActive = false;
      this.isIdentificationActive = true;
      this.skillsisActive = false;
      this.experienceisActive = false;
      this.educationisActive = false;
      this.certificatesisActive = false;
      this.coursesisActive = false;
    } else if (index === 1) {
      this.isBasicActive = true;
      this.isContactActive = false;
      this.isAddressActive = false;
      this.isIdentificationActive = false;
      this.skillsisActive = false;
      this.experienceisActive = false;
      this.educationisActive = false;
      this.certificatesisActive = false;
      this.coursesisActive = false;
    }
    this.switchTab.emit(this.index);
  }
  GoToCompetencyTab(index: number) {
    this.ScrolltoTarget('#competencies');
    this.competencyIndex = index;
    if (index === 2) {
      this.skillsisActive = false;
      this.experienceisActive = true;
      this.educationisActive = false;
      this.certificatesisActive = false;
      this.coursesisActive = false;
      this.positionOfTrustisActive = false;
      this.isBasicActive = false;
      this.isContactActive = false;
      this.isAddressActive = false;
      this.isIdentificationActive = false;
    } else if (index === 3) {
      this.skillsisActive = false;
      this.experienceisActive = false;
      this.educationisActive = true;
      this.certificatesisActive = false;
      this.coursesisActive = false;
      this.positionOfTrustisActive = false;
      this.isBasicActive = false;
      this.isContactActive = false;
      this.isAddressActive = false;
      this.isIdentificationActive = false;
    } else if (index === 4) {
      this.skillsisActive = false;
      this.experienceisActive = false;
      this.educationisActive = false;
      this.certificatesisActive = true;
      this.coursesisActive = false;
      this.positionOfTrustisActive = false;
      this.isBasicActive = false;
      this.isContactActive = false;
      this.isAddressActive = false;
      this.isIdentificationActive = false;
    } else if (index === 5) {
      this.skillsisActive = false;
      this.experienceisActive = false;
      this.educationisActive = false;
      this.certificatesisActive = false;
      this.coursesisActive = true;
      this.positionOfTrustisActive = false;
      this.isBasicActive = false;
      this.isContactActive = false;
      this.isAddressActive = false;
      this.isIdentificationActive = false;
    } else if (index === 6) {
      this.skillsisActive = false;
      this.experienceisActive = false;
      this.educationisActive = false;
      this.certificatesisActive = false;
      this.coursesisActive = false;
      this.positionOfTrustisActive = true;
      this.isBasicActive = false;
      this.isContactActive = false;
      this.isAddressActive = false;
      this.isIdentificationActive = false;
    } else if (index === 1) {
      this.skillsisActive = true;
      this.experienceisActive = false;
      this.educationisActive = false;
      this.certificatesisActive = false;
      this.coursesisActive = false;
      this.positionOfTrustisActive = false;
      this.isBasicActive = false;
      this.isContactActive = false;
      this.isAddressActive = false;
      this.isIdentificationActive = false;
    }
    this.switchCompetencyTab.emit(this.competencyIndex);
  }
}
