import { Component } from '@angular/core';
import { RescheduleModalComponentService } from 'src/app/shared/reschedule-modal/reschedule-modal.service';

@Component({
  selector: 'app-left-side-info',
  templateUrl: './left-side-info.component.html',
  styleUrls: ['./left-side-info.component.scss']
})
export class LeftSideInfoComponent {
  constructor(
    private dialog: RescheduleModalComponentService
  ) {}
  OpenReschedule() {
    const dialogRef = this.dialog.openDialog('');
  }
}
