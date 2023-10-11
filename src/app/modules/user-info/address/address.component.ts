import { Component } from '@angular/core';
import { Address } from 'src/app/models/address.model';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent {
  public sidenavOpen: boolean = false;
  AddressList: Address[] = [];
  selectedAddress!:Address;

  OpenSidenav() {
    this.selectedAddress = new Object() as Address;
    this.sidenavOpen = true;
    document.body.style.overflow = 'hidden';
  }
  CloseSidenav() {
    this.sidenavOpen = false;
    document.body.style.overflow = 'auto';
  }
  AddressAdded(address:Address){
    this.AddressList.push(address);
    this.CloseSidenav();
  }
  DeleteAddress(selectedAddress:Address){
    this.AddressList = this.AddressList.filter((address:Address) => address.addressId !== selectedAddress.addressId);
  }
  EditAddress(address:Address){
    this.selectedAddress = address;
    this.OpenSidenav();
  }
}
