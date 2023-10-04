import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NotificationModalComponent } from './notification-modal.component';

@Injectable({
  providedIn: 'root',
})
export class NotificationModalComponentService {
  constructor(private dialog: MatDialog) {}

  openDialog(message: string): MatDialogRef<NotificationModalComponent> {
    return this.dialog.open(NotificationModalComponent, {
      data: { message },
      disableClose: true,
      panelClass: 'notification-modal',
      enterAnimationDuration: 300,
      exitAnimationDuration: 300
    });
  }
  closeDialog() {
    this.dialog.closeAll();
  }
}