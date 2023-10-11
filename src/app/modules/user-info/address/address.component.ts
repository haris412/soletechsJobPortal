import { Component } from '@angular/core';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent {
  public sidenavOpen: boolean = false;
  OpenSidenav() {
    this.sidenavOpen = true;
    document.body.style.overflow = 'hidden';
  }

  CloseSidenav() {
    this.sidenavOpen = false;
    document.body.style.overflow = 'auto';
  }
}
