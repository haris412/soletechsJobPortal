import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
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

  @Input() selectedJob: Job = new Object() as Job;
  @Output() backClicked: EventEmitter<boolean> = new EventEmitter();
  width: number = window.innerWidth;
  minimunWidth: number = 992;
  show: boolean = false;
  mobileView: boolean = false;
  webView: boolean = true;
  constructor(
    private signUp: SignupModalComponentService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.mobileView = this.width < this.minimunWidth;
    if (this.mobileView && this.selectedJob.jobId === undefined) {
      this.show = true;
      this.webView = false;
    } else if (this.mobileView && this.selectedJob.jobId !== undefined) {
      this.webView = false;
      this.show = true;
    }
  }

  onWindowResize(event: any) {
    this.width = event.target.innerWidth;
    this.mobileView = this.width < this.minimunWidth;
    if (this.mobileView && this.selectedJob.jobId !== undefined) {
      this.show;
    } else if (this.mobileView && this.selectedJob.jobId === undefined) {

    }
  }
  Back() {
    this.backClicked.emit(true);
  }
  SignUpModal() {
    const dialogRef = this.signUp.openDialog('');
  }
  QuickApply() {
    this.router.navigate(['/quick-apply']);
  }
}
