import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { OfferModalComponent } from './offer-modal.component';

@Injectable({
  providedIn: 'root',
})
export class OfferModalComponentService {
  constructor(private dialog: MatDialog) {}

  openDialog(message: string): MatDialogRef<OfferModalComponent> {
    return this.dialog.open(OfferModalComponent, {
      data: { message },
      disableClose: true,
      panelClass: 'offer-modal',
      enterAnimationDuration: 300,
      exitAnimationDuration: 300
    });
  }
  closeDialog() {
    this.dialog.closeAll();
  }
}