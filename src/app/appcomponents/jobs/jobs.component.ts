import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AppLookUpService } from 'src/app/app-services/app-look-up.service';
import { TranslationAlignmentService } from 'src/app/app-services/translation-alignment.service';
import { Job } from 'src/app/models/job.model';
import { ApplicantDataService } from 'src/app/modules/applicant-portal/services/applicant-shared.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { SignupModalComponentService } from 'src/app/shared/signup-modal/signup-modal.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
  host: {
    '(window:resize)': 'onWindowResize($event)',
  },
})
export class JobsComponent implements OnInit {

  @Input() selectedJob: any = new Object() as any;
  @Input() recruitmentProject:Job = new Object() as Job;
  @Input() applyBtn:string = 'Apply';
  @Input() disableBtn:boolean = false;
  @Output() backClicked: EventEmitter<boolean> = new EventEmitter();
  width: number = window.innerWidth;
  minimunWidth: number = 992;
  show: boolean = false;
  mobileView: boolean = false;
  webView: boolean = true;
  public sidenavOpen: boolean = false;
  email:string  = '';
  dialogRef:any;


  constructor(
    private signUp: SignupModalComponentService,
    private router: Router,
    private lookUpService:AppLookUpService,
    public applicantDataService:ApplicantDataService,
    public sharedService: SharedService,    
    public translationService: TranslationAlignmentService
    ) { 
      this.applicantDataService.signUpModalEmitter.subscribe(x=> this.CloseModal());
      this.sharedService.jobDetail = this.sharedService.DeepCopyObject(this.selectedJob);
      this.translationService.languageChange.subscribe(x  => {
        this.translationService.isTranslate = x;
        this.JobDetailLanguageChanges();
      });
   }

  async ngOnInit() {
    this.sharedService.jobDetail = this.sharedService.DeepCopyObject(this.selectedJob);
    this.JobDetailLanguageChanges();
    this.mobileView = this.width < this.minimunWidth;
    if (this.mobileView && this.selectedJob.$id === undefined) {
      this.show = true;
      this.webView = false;
    } else if (this.mobileView && this.selectedJob.$id !== undefined) {
      this.webView = false;
      this.show = true;
    }
    await this.applicantDataService.GetApplicantSavedJobsList();
  }

  onWindowResize(event: any) {
    this.width = event.target.innerWidth;
    this.mobileView = this.width < this.minimunWidth;
    if (this.mobileView && this.selectedJob.$id !== undefined) {
      this.show;
    } else if (this.mobileView && this.selectedJob.$id === undefined) {

    }
  }
  
  Back() {
    this.backClicked.emit(true);
  }
  SignUpModal() {
     this.dialogRef = this.signUp.openDialog('');
  }
  OpenSidenav(selectedJob:any) {
    if (localStorage.getItem('applicantId')) {
      this.sidenavOpen = true;
      document.body.style.overflow = 'hidden';
    }
    else {
      this.router.navigate(['/login']);
    }
  }

  CloseSidenav() {
    this.sidenavOpen = false;
    document.body.style.overflow = 'auto';
    if (this.sharedService.applied) {
      this.applyBtn = "Applied";
      this.disableBtn = true;
      this.sharedService.applied = false;
    }
  }

  CloseModal(){
    this.signUp.closeDialog();
  }

  JobDetailLanguageChanges() {
    if (this.selectedJob != null) {
      if (this.translationService.isTranslate) {
        this.selectedJob.Description = this.sharedService.jobDetail?.jobArabic ? this.sharedService.jobDetail?.jobArabic : this.sharedService.jobDetail?.Description;
        this.selectedJob.JobLocation = this.sharedService.jobDetail?.jobLocationArabic ? this.sharedService.jobDetail?.jobLocationArabic : this.sharedService.jobDetail?.JobLocation;
        this.selectedJob.JobAd = this.sharedService.jobDetail?.jobadTextArabic ? this.sharedService.jobDetail?.jobadTextArabic : this.sharedService.jobDetail?.JobAd;
        this.selectedJob.Overview = this.sharedService.jobDetail?.OverviewArabic ? this.sharedService.jobDetail?.OverviewArabic : this.sharedService.jobDetail?.Overview;  
        this.selectedJob.Skills = this.sharedService.jobDetail?.SkillsArabicList ? this.sharedService.jobDetail?.SkillsArabicList : this.sharedService.jobDetail?.Skills;        
      
      } else {
        this.selectedJob = this.sharedService.DeepCopyObject(this.sharedService.jobDetail);
      }     
    }
  }
}
