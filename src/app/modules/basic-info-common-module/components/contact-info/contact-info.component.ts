import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppLookUpService } from 'src/app/app-services/app-look-up.service';
import { ContactInfo } from 'src/app/models/contact-info.model';
import { UserInfoService } from 'src/app/modules/user-info/user-info.service';

import { DeleteModalComponentService } from 'src/app/shared/delete-modal/delete-modal.service';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.scss']
})
export class ContactInfoComponent implements OnInit {
  public sidenavOpen: boolean = false;
  contactInfoList:ContactInfo[] = [];
  selectedContact!:ContactInfo;
  @Input() isUserProfile : boolean = false;
 constructor(private toastrService: ToastrService,
             private lookUpService: AppLookUpService,
             public userInfoService: UserInfoService,
             private deleteModal: DeleteModalComponentService){}
  
  ngOnInit(): void {
    
  }
  
  async ContactAdded(contact:ContactInfo){
    let contactData :ContactInfo = {
      ...contact,
      Type:Number(contact.Type),
      recid:contact?.recid ? contact?.recid : 0,
      applicantPersonRecId:Number(localStorage.getItem('applicantPersonRecid'))
    }
    let response = await this.lookUpService.GetUpdateApplicantProfileContact(contactData);
    if(response){
    this.toastrService.success(response?.Message);
    await this.userInfoService.GetApplicantProfile();
    this.CloseSidenav();
    }
  }
  DeleteContact(contact:ContactInfo){
    const data = `Are you sure you want to do delete this contact?`;
    const dialogRef = this.deleteModal.openDialog(data);
    dialogRef.afterClosed().subscribe(async (dialogResult: any) => {
      if (dialogResult) {
        let applicantPersonRecId = Number(localStorage.getItem('recId'));
        let response: any = await this.lookUpService.DeleteContact(contact?.recid ?? 0, applicantPersonRecId,contact.ContactNumber);
        if (response?.Status) {
          this.toastrService.success(response?.Message);
          await this.userInfoService.GetApplicantProfile();
        } else {
          this.toastrService.error(response?.Message);
        }
      }
    });
  }
  EditContact(contact:ContactInfo){
    this.userInfoService.selectedContact = contact;
    this.OpenSidenav();
  }
  AddContact(){
    this.userInfoService.selectedContact = new Object() as ContactInfo;
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
}
