import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RejectOfferComponent } from './reject-offer.component';

@Injectable({
  providedIn: 'root',
})
export class RejectModalComponentService {
  constructor(private dialog: MatDialog) {}

  openDialog(message: string): MatDialogRef<RejectOfferComponent> {
    return this.dialog.open(RejectOfferComponent, {
      data: { message },
      disableClose: true,
      panelClass: 'reject-offer-modal',
      enterAnimationDuration: 300,
      exitAnimationDuration: 300
    });
  }
  closeDialog() {
    this.dialog.closeAll();
  }
}