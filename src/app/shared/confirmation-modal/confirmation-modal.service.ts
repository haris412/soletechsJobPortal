import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { ConfirmationModalComponent } from './confirmation-modal.component';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationModalComponentService {
  constructor(private dialog: MatDialog) {}

  openDialog(message: string): MatDialogRef<ConfirmationModalComponent> {
    return this.dialog.open(ConfirmationModalComponent, {
      data: { message },
      disableClose: true,
      panelClass: 'delete-modal',
      enterAnimationDuration: 300,
      exitAnimationDuration: 300
    });
  }
  closeDialog(dialogRef: MatDialogRef<ConfirmationModalComponent>) {
    dialogRef.close();
  }
}