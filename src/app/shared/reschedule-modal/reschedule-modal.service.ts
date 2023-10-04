import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RescheduleModalComponent } from './reschedule-modal.component';

@Injectable({
  providedIn: 'root',
})
export class RescheduleModalComponentService {
  constructor(private dialog: MatDialog) {}

  openDialog(message: string): MatDialogRef<RescheduleModalComponent> {
    return this.dialog.open(RescheduleModalComponent, {
      data: { message },
      disableClose: true,
      panelClass: 'reschedule-modal',
      enterAnimationDuration: 300,
      exitAnimationDuration: 300
    });
  }
  closeDialog(dialogRef: MatDialogRef<RescheduleModalComponent>) {
    dialogRef.close();
  }
}