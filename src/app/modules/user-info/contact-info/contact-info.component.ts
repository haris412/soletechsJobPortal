import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppLookUpService } from 'src/app/app-services/app-look-up.service';
import { ContactInfo } from 'src/app/models/contact-info.model';
import { UserInfoService } from '../user-info.service';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.scss']
})
export class ContactInfoComponent implements OnInit {
  public sidenavOpen: boolean = false;
  contactInfoList:ContactInfo[] = [];
  selectedContact!:ContactInfo;
 constructor(private toastrService: ToastrService,
             private lookUpService: AppLookUpService,
             public userInfoService: UserInfoService){}
  
  ngOnInit(): void {
    
  }
  
  async ContactAdded(contact:ContactInfo){
    let contactData :ContactInfo = {
      ...contact,
      recid:contact?.recid ? contact?.recid : 0,
      Type:Number(contact.Type),
      applicantPersonRecId:Number(localStorage.getItem('recId'))
    }
    let response = await this.lookUpService.GetUpdateApplicantProfileContact(contactData);
    if(response){
    this.toastrService.success(response?.Message);
    await this.userInfoService.GetApplicantProfile();
    this.CloseSidenav();
    }
  }
  DeleteContact(contact:ContactInfo){
    this.contactInfoList = this.contactInfoList.filter((identity:ContactInfo) => identity.ContactNumber !== contact.ContactNumber);
  }
  EditContact(contact:ContactInfo){
    this.userInfoService.selectedContact = contact;
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
}
