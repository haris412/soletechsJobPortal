import { Component } from '@angular/core';
import { Identification } from 'src/app/models/identification.model';

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

  OpenSidenav() {
    this.selectedIdentification = new Object() as Identification;
    this.sidenavOpen = true;
    document.body.style.overflow = 'hidden';
  }
  CloseSidenav() {
    this.sidenavOpen = false;
    document.body.style.overflow = 'auto';
  }
  IdentificationAdded(identification:Identification){
    this.identificationList.push(identification);
    this.CloseSidenav();
  }
  DeleteIdentification(identification:Identification){
    this.identificationList = this.identificationList.filter((identity:Identification) => identity.identificationId !== identification.identificationId);
  }
  EditIdentification(identification:Identification){
    this.selectedIdentification = identification;
    this.OpenSidenav();
  }
}
