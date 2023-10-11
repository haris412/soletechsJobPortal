import { Component } from '@angular/core';

@Component({
  selector: 'app-identification',
  templateUrl: './identification.component.html',
  styleUrls: ['./identification.component.scss']
})
export class IdentificationComponent {
  public sidenavOpen: boolean = false;
  public isFile: boolean = false;
  OpenSidenav() {
    this.sidenavOpen = true;
    document.body.style.overflow = 'hidden';
  }

  CloseSidenav() {
    this.sidenavOpen = false;
    document.body.style.overflow = 'auto';
  }
}
