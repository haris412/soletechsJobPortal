import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public sidenavOpen: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  OpenSidenav() {
    this.sidenavOpen = true;
  }

  CloseSidenav() {
    this.sidenavOpen = false;
  }

}
