import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-reject-modal',
  templateUrl: './reject-offer.component.html',
  styleUrls: ['./reject-offer.component.scss']
})
export class RejectOfferComponent {
  rejectOfferForm!: UntypedFormGroup;
  private _formBuilder = inject(UntypedFormBuilder);
  get f() { return this.rejectOfferForm.controls; }
  constructor(
    private dialog: MatDialogRef<DeleteModalComponent>,
    ) {
      this.rejectOfferForm = this._formBuilder.group({
        comments: ['', [Validators.required]],
      });
    }
  closeDialog() {
    const dialogRef = this.dialog.close();
  }
  Reject(){
    if (this.rejectOfferForm.valid) {
      this.dialog.close(this.rejectOfferForm.value.comments);
    } else {
      this.rejectOfferForm.markAllAsTouched();
    }
  }
}
