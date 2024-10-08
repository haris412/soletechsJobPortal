import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Address } from 'src/app/models/address.model';

import { AppLookUpService } from 'src/app/app-services/app-look-up.service';
import { DeleteModalComponentService } from 'src/app/shared/delete-modal/delete-modal.service';
import { UserInfoService } from 'src/app/modules/user-info/user-info.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  public sidenavOpen: boolean = false;
  AddressList: Address[] = [];
  selectedAddress!:Address;
  @Input() isUserProfile : boolean = false;
  constructor(private toastrService: ToastrService,
              private lookUpService:AppLookUpService,
            public userInfoService: UserInfoService,
            private deleteModal: DeleteModalComponentService){}

  async ngOnInit() {
    if (this.userInfoService?.identificationList?.parmApplicantProfileIdentificationList == undefined || this.userInfoService?.identificationList?.parmApplicantProfileIdentificationList.length == 0) {
      await this.userInfoService.GetApplicantProfile();
    }  
  }

  AddAddress(){
    this.selectedAddress = new Object() as Address;
    this.OpenSidenav();
  }

  OpenSidenav() {
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
        recid: address?.recid ? address?.recid : 0,
        PostalCode: address?.PostalCode ? address?.PostalCode : '',
        ApplicantPersonRecid: Number(localStorage.getItem('applicantPersonRecid'))
      }
      let response = await this.lookUpService.GetUpdateApplicantProfileAddress(addressData);
      if (response?.Status) {
        this.toastrService.success(response?.Message);
        this.CloseSidenav();
        await this.userInfoService.GetApplicantProfile();
      } else {
        this.toastrService.error(response?.Message);
      }
    } catch (exception) {
      console.error()
    }
  }
  DeleteAddress(selectedAddress:Address){
    const data = `Are you sure you want to do delete this Address?`;
    const dialogRef = this.deleteModal.openDialog(data);
    dialogRef.afterClosed().subscribe(async (dialogResult: any) => {
      if (dialogResult) {
        let applicantPersonRecId = selectedAddress.ApplicantPersonRecid;
        let response:any = await this.lookUpService.DeleteAddress(selectedAddress.ApplicantPersonRecid);
        if(response?.Status){
          this.toastrService.success(response?.Message);
          await this.userInfoService.GetApplicantProfile();
        }else{
          this.toastrService.error(response?.Message);
        }
      }
    });
  }
  EditAddress(address:Address){
    this.selectedAddress = address;
    this.OpenSidenav();
  }
}
