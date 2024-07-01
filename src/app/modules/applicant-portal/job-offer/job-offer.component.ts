import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { AppLookUpService } from 'src/app/app-services/app-look-up.service';
import { TranslationAlignmentService } from 'src/app/app-services/translation-alignment.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ApplicantOfferAction } from 'src/app/models/ApplicantOfferAction.model';
import { RescheduleModalComponentService } from 'src/app/shared/reschedule-modal/reschedule-modal.service';
import { OfferModalComponentService } from 'src/app/shared/offer-modal/offer-modal.service';
import { RejectModalComponentService } from 'src/app/shared/reject-offer/reject-offer.service';
import { OfferAcceptanceRejection } from 'src/app/models/offer-acceptance-rejection.model';


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
  jobOfferAction:any;
  dialogRef:any;
  constructor(private location: Location,
              private toastrService: ToastrService,
              private router:Router,
              private service:AppLookUpService,
              private dialog: RescheduleModalComponentService,
              private route: ActivatedRoute,
              public translationService: TranslationAlignmentService,
              public acceptOfferModal: OfferModalComponentService,
              public rejectModal: RejectModalComponentService,
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
      this.jobOfferAction = response?.jobOffer_ShowActionButton
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

  // AcceptOffer(){
  //   this.toastrService.success("Congratulations you have accepted the offer");
  //   this.router.navigate(['/applicant']);
  // }
  // RejectOffer(){
  //   this.toastrService.success("You have rejected the offer");
  //   this.router.navigate(['/applicant']);
  // }
  // async PerformOfferActoin(){
  //   let jobOfferAction:ApplicantOfferAction = {
  //     jobOfferId:this.basicInfo?.offerId,
  //     outcome:''
  //   }
  //   let jobOfferActionResponse = await this.service.PerformOfferActoin(jobOfferAction);
  //   if(jobOfferActionResponse){
  //     console.log(jobOfferActionResponse);
  //   }
  // }
  acceptOfferComment(outcome:string) {
    this.dialogRef = this.acceptOfferModal.openDialog('');
    this.dialogRef.afterClosed().subscribe(async (dialogResult: any) => {
      if (dialogResult) {
        let offerAcceptanceData: ApplicantOfferAction = {
          jobOfferId: this.basicInfo?.offerId,
          outcome:outcome,
          comment: dialogResult,
        };
        let response: any = await this.service.PerformOfferActoin(
          offerAcceptanceData
        );
        if (response?.Status) {
          this.toastrService.success(response?.Message);
          this.router.navigate(['applicant/dashboard']);

        } else {
          this.toastrService.error(response?.Message);
        }
      }
    });
  }
  RejectOfferComment(outcome:string) {
    this.dialogRef = this.rejectModal.openDialog('');
    this.dialogRef.afterClosed().subscribe(async (dialogResult: any) => {
      if (dialogResult) {
        let offerAcceptanceData: ApplicantOfferAction = {
          jobOfferId: this.basicInfo?.offerId,
          outcome:outcome,
          comment: dialogResult,
        };
        let response: any = await this.service.PerformOfferActoin(
          offerAcceptanceData
        );
        if (response?.Status) {
          this.toastrService.success(response?.Message);
          this.router.navigate(['applicant/dashboard']);
        } else {
          this.toastrService.error(response?.Message);
        }
      }
    });
  }

  ClaimOffer(outCome:string){
    this.dialogRef = this.rejectModal.openDialog('');
    this.dialogRef.afterClosed().subscribe(async (dialogResult: any) => {
      if (dialogResult) {
        let offerAcceptanceData: ApplicantOfferAction = {
          jobOfferId: this.basicInfo?.offerId,
          outcome:outCome,
          comment: dialogResult,
        };
        let response: any = await this.service.PerformOfferActoin(
          offerAcceptanceData
        );
        if (response?.Status) {
          this.toastrService.success(response?.Message);
        } else {
          this.toastrService.error(response?.Message);
        }
      }
    });
  }
}
