import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';

@Component({
  selector: 'app-reject-modal',
  templateUrl: './reject-offer.component.html',
  styleUrls: ['./reject-offer.component.scss']
})
export class RejectOfferComponent {
  constructor(
    private dialog: MatDialogRef<DeleteModalComponent>,
    ) {
      
    }
  closeDialog() {
    const dialogRef = this.dialog.close();
  }
  Reject(){
    this.dialog.close(true);
  }
}
