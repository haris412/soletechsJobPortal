import { Component } from '@angular/core';
import { Location } from '@angular/common';


@Component({
  selector: 'app-job-offer',
  templateUrl: './job-offer.component.html',
  styleUrls: ['./job-offer.component.scss']
})
export class JobOfferComponent {
  constructor(private location: Location) { }
  
  GoBack() {
    this.location.back();
  }
}
