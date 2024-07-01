import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-offer-modal',
  templateUrl: './offer-modal.component.html',
  styleUrls: ['./offer-modal.component.scss']
})
export class OfferModalComponent {
  acceptOfferForm!: UntypedFormGroup;
  private _formBuilder = inject(UntypedFormBuilder);
  get f() { return this.acceptOfferForm.controls; }

  constructor(
    private dialog: MatDialogRef<DeleteModalComponent>,
    ) {
        this.acceptOfferForm = this._formBuilder.group({
          comments: ['', [Validators.required]],
          
        });
    }
  closeDialog() {
    const dialogRef = this.dialog.close();
  }
  Accept(){
    if(this.acceptOfferForm.valid){
    this.dialog.close(this.acceptOfferForm.value.comments);
    }else{
      this.acceptOfferForm.markAllAsTouched()
    }
  }
}
