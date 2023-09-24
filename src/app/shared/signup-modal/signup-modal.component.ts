import { Component } from '@angular/core';
import { DeleteModalComponentService } from '../delete-modal/delete-modal.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-signup-modal',
  templateUrl: './signup-modal.component.html',
  styleUrls: ['./signup-modal.component.scss']
})
export class SignupModalComponent {
  constructor(
    private deleteModal: MatDialogRef<SignupModalComponent>
  ) {

  }
  closeDialog() {
    const dialogRef = this.deleteModal.close();
  }
}
