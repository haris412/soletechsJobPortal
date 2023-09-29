import { Component } from '@angular/core';
import { Location } from '@angular/common';


@Component({
  selector: 'app-applicant-onboarding',
  templateUrl: './applicant-onboarding.component.html',
  styleUrls: ['./applicant-onboarding.component.scss']
})
export class ApplicantOnboardingComponent {
  public completed: boolean = true;
  public sidenavOpen: boolean = false;
  title = 'angular';
  index: Number = 1;
  constructor(private location: Location) { }

  ngOnInit(): void {
  }

  OpenSidenav() {
    this.sidenavOpen = true;
  }

  CloseSidenav() {
    this.sidenavOpen = false;
  }

  Next() {
    if (this.index === 1) {
      this.index = 2;
    } else if (this.index === 2) {
      this.index = 3;
    } else if (this.index === 3) {
      this.index = 4;
    }
  }
  Back(index: Number) {
    if (index === 2) {
      this.index = 1;
    } else if (index === 3) {
      this.index = 2;
    } else if (index === 4) {
      this.index = 3;
    }
  }
  GoBack() {
    this.location.back();
  }
}
