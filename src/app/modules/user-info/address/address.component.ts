import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Address } from 'src/app/models/address.model';
import { UserInfoService } from '../user-info.service';
import { AppLookUpService } from 'src/app/app-services/app-look-up.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent {
  public sidenavOpen: boolean = false;
  AddressList: Address[] = [];
  selectedAddress!:Address;

  constructor(private toastrService: ToastrService,
              private lookUpService:AppLookUpService,
            private userInfoService: UserInfoService){}
  OpenSidenav() {
    this.selectedAddress = new Object() as Address;
    this.sidenavOpen = true;
    document.body.style.overflow = 'hidden';
  }
  CloseSidenav() {
    this.sidenavOpen = false;
    document.body.style.overflow = 'auto';
  }
  async AddressAdded(address:Address){
    try {
      let addressData: Address = {
        ...address,
        recid: 0,
        PostalCode: "",
        ApplicantPersonRecid: Number(localStorage.getItem('recId'))
      }
      let response = await this.lookUpService.GetUpdateApplicantProfileAddress(addressData);
      if (response?.Status) {
        this.toastrService.success(response?.Message);
        this.CloseSidenav();
      } else {
        this.toastrService.error(response?.Message);
      }
    } catch (exception) {
      console.error()
    }
  }
  DeleteAddress(selectedAddress:Address){
    this.AddressList = this.AddressList?.filter((address:Address) => address?.Address !== selectedAddress?.Address);
  }
  EditAddress(address:Address){
    this.selectedAddress = address;
    this.OpenSidenav();
  }
}
