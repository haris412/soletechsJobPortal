import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';

@Component({
  selector: 'app-offer-modal',
  templateUrl: './offer-modal.component.html',
  styleUrls: ['./offer-modal.component.scss']
})
export class OfferModalComponent {
  constructor(
    private dialog: MatDialogRef<DeleteModalComponent>,
    ) {
      
    }
  closeDialog() {
    const dialogRef = this.dialog.close();
  }
  Accept(){
    this.dialog.close(true);
  }
}
