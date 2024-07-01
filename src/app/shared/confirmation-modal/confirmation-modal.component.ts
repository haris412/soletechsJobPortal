import { Component, Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TranslationAlignmentService } from 'src/app/app-services/translation-alignment.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent {
  public message: string = '';
  constructor(
    private dialog: MatDialogRef<ConfirmationModalComponent>,
    public translationService: TranslationAlignmentService
    ) {
      this.translationService.languageChange.subscribe(x  => {
        this.translationService.isTranslate = x;
      });
    }
  closeDialog() {
    const dialogRef = this.dialog.close();
  }
  Confirm(){
    this.dialog.close(true);
  }
}
