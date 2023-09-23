import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SignupModalComponent } from '../signup-modal/signup-modal.component';

@Injectable({
  providedIn: 'root',
})
export class SignupModalComponentService {
  constructor(private dialog: MatDialog) {}

  openDialog(message: string): MatDialogRef<SignupModalComponent> {
    return this.dialog.open(SignupModalComponent, {
      data: { message },
      disableClose: true,
      panelClass: 'signup-modal'
    });
  }
  closeDialog() {
    this.dialog.closeAll();
  }
}