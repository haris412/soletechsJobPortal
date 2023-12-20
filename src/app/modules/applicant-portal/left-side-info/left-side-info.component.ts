import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RescheduleModalComponentService } from 'src/app/shared/reschedule-modal/reschedule-modal.service';
import { LinkedInService } from '../services/linkedin.service';
import { ApplicantDataService } from '../services/applicant-shared.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-left-side-info',
  templateUrl: './left-side-info.component.html',
  styleUrls: ['./left-side-info.component.scss']
})
export class LeftSideInfoComponent implements OnInit{
  
  userImage:string = 'assets/Images/Profile.png';
  isDisable: boolean = false;
  jobList: any[] = [{name:'Designer', type:'Full Time'}];
  userEmail:string = '';

  constructor(private dialog: RescheduleModalComponentService,
    private toastrService: ToastrService,
    private router: Router,
    public linkedInServive: LinkedInService,
    public applicantService: ApplicantDataService,
    private _sanitizer: DomSanitizer

  ) { 
    this.userEmail = localStorage.getItem('userName') ?? '';
  }
  async ngOnInit() {
    var applicant = localStorage.getItem('applicantId') ?? '';
    if (this.applicantService.applicantData == undefined && applicant != "") {
      await this.applicantService.GetUserInfo();
    }
    if (this.applicantService.applicantData != undefined && this.applicantService.applicantData.applicantImage != "") {
      this.applicantService.applicantImage = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' 
                 + this.applicantService.applicantData.applicantImage);
    }
  }
  GetApplicantInfo(){
    let applicantData = this.applicantService.GetApplicantInfo();
    if(applicantData){
      this.userImage = applicantData?.applicantImage;
    }
  }
  OpenReschedule() {
    const dialogRef = this.dialog.openDialog('');
  }
  Confirm() {
    this.toastrService.success('Your Interview Has Been Scheduled');
    this.isDisable = true;
  }
  GoToJobs() {
    this.router.navigate(['/jobs']);
  }
  GoToProfile(){
    this.router.navigate(['/user-profile']);
  }
  GoToBasicInfo(){
    this.router.navigate(['/profile']);
  }
  GoToCompetencies(){
    this.router.navigate(['/competencies']);
  }
}
