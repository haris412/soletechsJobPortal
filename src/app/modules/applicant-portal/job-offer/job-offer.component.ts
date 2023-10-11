import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-job-offer',
  templateUrl: './job-offer.component.html',
  styleUrls: ['./job-offer.component.scss']
})
export class JobOfferComponent {
  constructor(private location: Location,
              private toastrService: ToastrService,
              private router:Router) { }
  
  GoBack() {
    this.location.back();
  }
  AcceptOffer(){
    this.toastrService.success("Congratulations you have accepted the offer");
    this.router.navigate(['/applicant']);
  }
  RejectOffer(){
    this.toastrService.success("You have rejected the offer");
    this.router.navigate(['/applicant']);
  }
}
