import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Address } from 'src/app/models/address.model';

@Component({
  selector: 'app-add-edit-address',
  templateUrl: './add-edit-address.component.html',
  styleUrls: ['./add-edit-address.component.scss']
})
export class AddEditAddressComponent {

  @Input() selectedAddress:Address = new Object() as Address;
  @Output() closeSideNav: EventEmitter<any> = new EventEmitter();
  @Output() addressData: EventEmitter<Address> = new EventEmitter();
  addressForm: UntypedFormGroup;
  private _formBuilder = inject(UntypedFormBuilder);
  identification!: Address
  constructor(private toastrService: ToastrService) {
    this.addressForm = this._formBuilder.group({
      addressId: [''],
      nameOfDescription: ['', [Validators.required]],
      country: ['', [Validators.required]],
      city: ['', [Validators.required]],
      street: ['',[Validators.required]],
      zipCode: ['', [Validators.required]],
      postBox: ['']
    });
  }
 ngOnInIt(){
   if (this.selectedAddress.nameOfDescription !== '') {
     this.addressForm.patchValue({
       ...this.selectedAddress
     });
   } else {
     this.addressForm.reset();
   }
 }
  CloseAddressNav: () => void = () => {
    this.closeSideNav.emit(true);
  }

  SaveIdentification: () => void = () => {
    if (this.addressForm.valid) {
      this.identification = this.addressForm.getRawValue();
      
      this.addressData.emit(this.identification);
    } else {
      this.addressForm.markAllAsTouched();
    }
  }
  Discard: () => void = () => {
    this.addressForm.reset();
  }
}
