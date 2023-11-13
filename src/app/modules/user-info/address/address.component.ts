import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Address } from 'src/app/models/address.model';
import { UserInfoService } from '../user-info.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent {
  public sidenavOpen: boolean = false;
  AddressList: Address[] = [];
  selectedAddress!:Address;

  constructor(private toastrService: ToastrService
           , private userInfoService: UserInfoService){}
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
    this.toastrService.success('Address Added Successfully');
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
