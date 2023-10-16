import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-identification',
  templateUrl: './identification.component.html',
  styleUrls: ['./identification.component.scss']
})
export class IdentificationComponent {
  public isFile: boolean = false;
  constructor(private router:Router){}

  GoToJobDetail(){
    this.router.navigate(['/jobs']);

  }
}
