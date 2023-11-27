import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Address } from 'src/app/models/address.model';
import { UserInfoService } from '../user-info.service';
import { AppLookUpService } from 'src/app/app-services/app-look-up.service';
import { DeleteModalComponentService } from 'src/app/shared/delete-modal/delete-modal.service';

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
            public userInfoService: UserInfoService,
            private deleteModal: DeleteModalComponentService){}
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
        PostalCode: "",
        ApplicantPersonRecid: Number(localStorage.getItem('recId'))
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
        let applicantPersonRecId = Number(localStorage.getItem('recId'));
        let response:any = await this.lookUpService.DeleteCertificate(selectedAddress?.recid ?? 0 ,applicantPersonRecId);
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
