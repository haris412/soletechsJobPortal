import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { AppLookUpService } from 'src/app/app-services/app-look-up.service';


@Component({
  selector: 'app-job-offer',
  templateUrl: './job-offer.component.html',
  styleUrls: ['./job-offer.component.scss']
})
export class JobOfferComponent implements OnInit{
  basicInfo:any;
  finaceInfo:any;
  benefits:any;
  applicationId:string = '';
  constructor(private location: Location,
              private toastrService: ToastrService,
              private router:Router,
              private service:AppLookUpService,
              private route: ActivatedRoute) { 
                this.route.params.subscribe(
                  params => 
                  this.applicationId = params['id']
                );
              }
  
  ngOnInit() {
    this.GetJobOffer();            
  }
  GoBack() {
    this.location.back();
  }
  async GetJobOffer(){
    let applcationId = localStorage.getItem("applicationId") ?? "";
    let response = await this.service.JobOfferDetails(applcationId);
    if(response){
      this.basicInfo = response?.jobOffer_BasicInfo;
      this.finaceInfo = response?.jobOffer_FinanceInfo;
      this.benefits = response?.jobOffer_BenefitInfo; 
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
