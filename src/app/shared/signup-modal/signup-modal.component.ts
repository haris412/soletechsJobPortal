import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-signup-modal',
  templateUrl: './signup-modal.component.html',
  styleUrls: ['./signup-modal.component.scss']
})
export class SignupModalComponent {

  constructor(
    private deleteModal: MatDialogRef<SignupModalComponent>
  ) { }
  closeDialog() {
    const dialogRef = this.deleteModal.close();
  }

  loginWithLinkedIn() {
    localStorage.setItem('token', 'ewr74#$43$#$#@@#');
    let url = `${environment.authorizationUrl}?response_type=code&client_id=${environment.clientId
    }&redirect_uri=${environment.redirect_uri}&scope=${environment.scope}`;
    window.open(url, "_self");
  }
}
