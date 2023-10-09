import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-signup-modal',
  templateUrl: './signup-modal.component.html',
  styleUrls: ['./signup-modal.component.scss']
})
export class SignupModalComponent {

  linkedInCredentials = {
    clientId: "86ykg7fe4magrl",
    redirectUrl: "http://localhost:4200/applicant/dashboard",
    scope: ['openid', 'profile', 'email' ]
  };

  constructor(
    private deleteModal: MatDialogRef<SignupModalComponent>
  ) {}
  closeDialog() {
    const dialogRef = this.deleteModal.close();
  }

  loginWithLinkedIn() {
    let url = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${
      this.linkedInCredentials.clientId
    }&redirect_uri=${this.linkedInCredentials.redirectUrl}&scope=${this.linkedInCredentials.scope}`;
    window.open(url, "_blank");
  }
}
