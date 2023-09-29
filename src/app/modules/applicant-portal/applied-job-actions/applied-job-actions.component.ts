import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-applied-job-actions',
  templateUrl: './applied-job-actions.component.html',
  styleUrls: ['./applied-job-actions.component.scss']
})
export class AppliedJobActionsComponent {
  public completed: boolean = false;
  constructor(
    private router: Router
  ) {

  }
  toOnboarding() {
    this.router.navigate(['/applicant/onboarding'])
  }
}
