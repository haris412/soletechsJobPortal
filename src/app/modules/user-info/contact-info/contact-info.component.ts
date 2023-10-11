import { Component } from '@angular/core';
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

  
  ContactAdded(contact:ContactInfo){
    this.contactInfoList.push(contact);
    this.CloseSidenav();
  }
  DeleteContact(contact:ContactInfo){
    this.contactInfoList = this.contactInfoList.filter((identity:ContactInfo) => identity.contactId !== contact.contactId);
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
