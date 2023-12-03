import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AppLookUpService } from 'src/app/app-services/app-look-up.service';


@Component({
  selector: 'app-job-offer',
  templateUrl: './job-offer.component.html',
  styleUrls: ['./job-offer.component.scss']
})
export class JobOfferComponent implements OnInit{
  constructor(private location: Location,
              private toastrService: ToastrService,
              private router:Router,
              private service:AppLookUpService) { }
  
  ngOnInit() {
    this.GetJobOffer();            
  }
  GoBack() {
    this.location.back();
  }
  async GetJobOffer(){
    let response = await this.service.JobOfferDetails("00104");
    if(response.Status){
      console.log(response);
    }
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
