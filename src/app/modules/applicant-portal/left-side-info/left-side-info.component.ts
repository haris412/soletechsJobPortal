import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RescheduleModalComponentService } from 'src/app/shared/reschedule-modal/reschedule-modal.service';

@Component({
  selector: 'app-left-side-info',
  templateUrl: './left-side-info.component.html',
  styleUrls: ['./left-side-info.component.scss']
})
export class LeftSideInfoComponent {
  isDisable:boolean = false;
  jobList:any[]=[];
  constructor(private dialog: RescheduleModalComponentService,
              private toastrService: ToastrService
  ) {}

  OpenReschedule() {
    const dialogRef = this.dialog.openDialog('');
  }
  Confirm(){
    this.toastrService.success('Your Interview Has Been Scheduled');
    this.isDisable = true;
  }
}
