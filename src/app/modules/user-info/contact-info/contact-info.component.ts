import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppLookUpService } from 'src/app/app-services/app-look-up.service';
import { ContactInfo } from 'src/app/models/contact-info.model';
import { UserInfoService } from '../user-info.service';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.scss']
})
export class ContactInfoComponent {
  public sidenavOpen: boolean = false;
  contactInfoList:ContactInfo[] = [];
  selectedContact!:ContactInfo;
 constructor(private toastrService: ToastrService,
             private lookUpService:AppLookUpService,
             private userInfoService:UserInfoService){}
  
  async ContactAdded(contact:ContactInfo){
    let contactData :ContactInfo = {
      ...contact,
      recid:0,
      Type:Number(contact.Type),
      applicantPersonRecId:Number(localStorage.getItem('recId'))
    }
    let response = await this.lookUpService.GetUpdateApplicantProfileContact(contactData);
    if(response){
    this.toastrService.success(response?.Message);
    this.GetApplicantProfile();
    this.CloseSidenav();
    }
  }
  DeleteContact(contact:ContactInfo){
    this.contactInfoList = this.contactInfoList.filter((identity:ContactInfo) => identity.ContactNumber !== contact.ContactNumber);
  }
  EditContact(contact:ContactInfo){
    this.selectedContact = contact;
    this.OpenSidenav();
  }
  OpenSidenav() {
    this.selectedContact = new Object() as ContactInfo;
    this.sidenavOpen = true;
    document.body.style.overflow = 'hidden';
  }

  CloseSidenav() {
    this.sidenavOpen = false;
    document.body.style.overflow = 'auto';
  }
  async GetApplicantProfile(){
    let applicantId = localStorage.getItem('applicantId') ?? '';
    let res = await this.lookUpService.GetApplicantProfile(applicantId);
    if(res){
       this.userInfoService.basicInfo = res?.ApplicantProfileGeneral;
       this.userInfoService.contactsList= res?.ApplicantProfileContactList?.parmApplicantProfileContactList;
       this.userInfoService.addressList = res?.ApplicantProfileAddressList?.parmApplicantProfileAddressList;
       this.userInfoService.identificationList = res?.ApplicantProfileIdentification
    }
}
}
