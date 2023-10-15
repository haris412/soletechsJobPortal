import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RescheduleModalComponentService } from 'src/app/shared/reschedule-modal/reschedule-modal.service';

@Component({
  selector: 'app-left-side-info',
  templateUrl: './left-side-info.component.html',
  styleUrls: ['./left-side-info.component.scss']
})
export class LeftSideInfoComponent {
  isDisable: boolean = false;
  jobList: any[] = [{name:'Designer', type:'Full Time'}];
  constructor(private dialog: RescheduleModalComponentService,
    private toastrService: ToastrService,
    private router: Router
  ) { }

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
}
