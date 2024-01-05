import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { AppLookUpService } from 'src/app/app-services/app-look-up.service';


@Component({
  selector: 'app-applicant-onboarding',
  templateUrl: './applicant-onboarding.component.html',
  styleUrls: ['./applicant-onboarding.component.scss']
})
export class ApplicantOnboardingComponent {
  public identificationisActive: boolean = true;
  public identificationCompleted: boolean = false;
  public documentsCompleted: boolean = false;
  public documentsisActive: boolean = false;
  public medicalCompleted: boolean = false;
  public medicalisActive: boolean = false;
  public dependentsCompleted: boolean = false;
  public dependentsisActive: boolean = false;
  public addressCompleted: boolean = false;
  public addressisActive: boolean = false;
  public emergencyContactCompleted: boolean = false;
  public emergencyContactisActive: boolean = false;
  public sidenavOpen: boolean = false;
  title = 'angular';
  index: Number = 1;
  constructor(private location: Location,
    private service:AppLookUpService) { }

  ngOnInit(): void {
    let applicantId = localStorage.getItem('applicantId') ?? '';
    let applicationId = localStorage.getItem('applicationId') ?? '';
    this.service.GetApplicationOnBoardingList(applicantId,applicationId);
  }

  OpenSidenav() {
    this.sidenavOpen = true;
  }

  CloseSidenav() {
    this.sidenavOpen = false;
  }

  Next() {
    if (this.index === 1) {
      this.identificationCompleted = true;
      this.documentsisActive = true;
      this.index = 2;
    } else if (this.index === 2) {
      this.documentsCompleted = true;
      this.medicalisActive = true;
      this.index = 3;
    } else if (this.index === 3) {
      this.medicalCompleted = true;
      this.dependentsisActive = true;
      this.index = 4;
    } else if (this.index === 4) {
      this.dependentsCompleted = true
      this.addressisActive = true;
      this.index = 5;
    } else if (this.index === 5) {
      this.addressCompleted = true;
      this.emergencyContactisActive = true
      this.index = 6;
    }
  }
  Back(index: Number) {
    if (index === 2) {
      this.index = 1;
    } else if (index === 3) {
      this.index = 2;
    } else if (index === 4) {
      this.index = 3;
    } else if (index === 5) {
      this.index = 4;
    } else if (index === 6) {
      this.index = 5;
    }
  }
  GoBack() {
    this.location.back();
  }
  GoToTab(index: number) {
    this.index = index;
  }
  Discard() { 
    
  }
}
