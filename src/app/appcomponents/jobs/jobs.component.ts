import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AppLookUpService } from 'src/app/app-services/app-look-up.service';
import { Job } from 'src/app/models/job.model';
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
  @Output() backClicked: EventEmitter<boolean> = new EventEmitter();
  width: number = window.innerWidth;
  minimunWidth: number = 992;
  show: boolean = false;
  mobileView: boolean = false;
  webView: boolean = true;
  public sidenavOpen: boolean = false;
  applyBtn:string = 'Apply';
  email:string  = '';
  appliedJobs:any[] = [];
  constructor(
    private signUp: SignupModalComponentService,
    private router: Router,
    private lookUpService:AppLookUpService) { 

   }

  ngOnInit(): void {
    this.mobileView = this.width < this.minimunWidth;
    if (this.mobileView && this.selectedJob.$id === undefined) {
      this.show = true;
      this.webView = false;
    } else if (this.mobileView && this.selectedJob.$id !== undefined) {
      this.webView = false;
      this.show = true;
    }
    this.email = localStorage.getItem('email') ?? '';
    if(this.email){
      this.GetAppliedJobs();
    }

  }
async GetAppliedJobs(){
    let applicantId = localStorage.getItem('applicantId') ?? '';
    let response = await this.lookUpService.MyApplicationJobList(applicantId);
    if(response){
      this.appliedJobs = response?.parmRecruitmentApplicationJobList;
    }
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
    const dialogRef = this.signUp.openDialog('');
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
  }
}
