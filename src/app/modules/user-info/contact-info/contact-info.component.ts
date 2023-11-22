import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ContactInfo } from 'src/app/models/contact-info.model';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.scss']
})
export class ContactInfoComponent {
  public sidenavOpen: boolean = false;
  contactInfoList:ContactInfo[] = [];
  selectedContact!:ContactInfo;
 constructor(private toastrService: ToastrService){}
  
  ContactAdded(contact:ContactInfo){
    this.toastrService.success('Contact Added Successfully');
    this.contactInfoList.push(contact);
    this.CloseSidenav();
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
}
