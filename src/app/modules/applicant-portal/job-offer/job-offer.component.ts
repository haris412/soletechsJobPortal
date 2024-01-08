import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { AppLookUpService } from 'src/app/app-services/app-look-up.service';
import { TranslationAlignmentService } from 'src/app/app-services/translation-alignment.service';
import { SharedService } from 'src/app/shared/services/shared.service';


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
              private route: ActivatedRoute,
              public translationService: TranslationAlignmentService,
              public shared: SharedService) { 
                this.route.params.subscribe(
                  params => 
                  this.applicationId = params['id']
                );
                this.translationService.languageChange.subscribe(x=> {
                  this.translationService.isTranslate = x;
                  this.ShowOfferLanguageChanges();
                });
              }
  
  ngOnInit() {
    this.GetJobOffer();   
    this.shared.showOfferBasicLanguageData = this.shared.DeepCopyObject(this.basicInfo);
    this.shared.showOfferFinanceLanguageData = this.shared.DeepCopyObject(this.finaceInfo);
    this.shared.showOfferBenefitsLanguageData = this.shared.DeepCopyObject(this.benefits);
    this.ShowOfferLanguageChanges();
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

  ShowOfferLanguageChanges() {
    if (this.translationService.isTranslate) {
      if (this.basicInfo) {
        this.basicInfo.candicateName = this.basicInfo.CandicateNameAr ? this.basicInfo.CandicateNameAr : this.basicInfo.candicateName;
        this.basicInfo.description = this.basicInfo.DescriptionAr ? this.basicInfo.DescriptionAr : this.basicInfo.description;
        this.basicInfo.nationality = this.basicInfo.NationalityAr ? this.basicInfo.NationalityAr : this.basicInfo.nationality;
        this.basicInfo.applicantName = this.basicInfo.applicationNameAr ? this.basicInfo.applicationNameAr : this.basicInfo.applicantName;
      }
      if (this.finaceInfo && this.finaceInfo?.parmApplicationFinanceInfoList) {
        for (let fin of this.finaceInfo?.parmApplicationFinanceInfoList) {
          fin.description = fin.descriptionAr ? fin.descriptionAr : fin.description;
        }
      }
    } else {
      this.basicInfo = this.shared.DeepCopyObject(this.shared.showOfferBasicLanguageData);
      this.finaceInfo = this.shared.DeepCopyObject(this.shared.showOfferFinanceLanguageData);
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
