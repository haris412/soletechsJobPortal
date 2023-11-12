import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { JobDetail } from 'src/app/models/job-detail.model';
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
  @Output() backClicked: EventEmitter<boolean> = new EventEmitter();
  width: number = window.innerWidth;
  minimunWidth: number = 992;
  show: boolean = false;
  mobileView: boolean = false;
  webView: boolean = true;
  public sidenavOpen: boolean = false;

  constructor(
    private signUp: SignupModalComponentService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.mobileView = this.width < this.minimunWidth;
    if (this.mobileView && this.selectedJob.$id === undefined) {
      this.show = true;
      this.webView = false;
    } else if (this.mobileView && this.selectedJob.$id !== undefined) {
      this.webView = false;
      this.show = true;
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
  OpenSidenav() {
    this.sidenavOpen = true;
    document.body.style.overflow = 'hidden';
  }

  CloseSidenav() {
    this.sidenavOpen = false;
    document.body.style.overflow = 'auto';
  }
}