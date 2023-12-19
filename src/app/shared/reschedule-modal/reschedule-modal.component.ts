import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { throwMatDuplicatedDrawerError } from '@angular/material/sidenav';
import { TranslationAlignmentService } from 'src/app/app-services/translation-alignment.service';

@Component({
  selector: 'app-reschedule-modal',
  templateUrl: './reschedule-modal.component.html',
  styleUrls: ['./reschedule-modal.component.scss']
})
export class RescheduleModalComponent implements OnInit {
  public message: string = '';
  public selected: any;
  constructor(
    private dialog: MatDialogRef<RescheduleModalComponent>,
    public translationService: TranslationAlignmentService
  ) { }
  closeDialog() {
    const dialogRef = this.dialog.close();
  }
  ngOnInit() {

  }
  
}
