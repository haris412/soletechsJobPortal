import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Identification } from 'src/app/models/identification.model';
import { UserInfoService } from '../user-info.service';
import { AppLookUpService } from 'src/app/app-services/app-look-up.service';

@Component({
  selector: 'app-identification',
  templateUrl: './identification.component.html',
  styleUrls: ['./identification.component.scss']
})
export class IdentificationComponent {
  public sidenavOpen: boolean = false;
  public isFile: boolean = false;
  identificationList: Identification[] = [];
  selectedIdentification!:Identification;

  constructor(private toastrService: ToastrService,
              private lookUpService:AppLookUpService){}
  OpenSidenav() {
    this.selectedIdentification = new Object() as Identification;
    this.sidenavOpen = true;
    document.body.style.overflow = 'hidden';
  }
  CloseSidenav() {
    this.sidenavOpen = false;
    document.body.style.overflow = 'auto';
  }
  async IdentificationAdded(identification:Identification){
    let identificationData :Identification = {
      ...identification,
      recid:identification?.recid ? identification?.recid : 0,
      applicantPersonRecId:Number(localStorage.getItem('recId'))
    }
    let response = await this.lookUpService.UpdateApplicantProfileIdentification(identificationData);
    if(response?.Status){
    this.toastrService.success(response?.Message);
    this.CloseSidenav();
    }else{
      this.toastrService.error(response?.Message);
    }
  }
  DeleteIdentification(identification:Identification){
    this.identificationList = this.identificationList.filter((identity:Identification) => identity.IdentificationNumber !== identification.IdentificationNumber);
  }
  EditIdentification(identification:Identification){
    this.selectedIdentification = identification;
    this.OpenSidenav();
  }
}
