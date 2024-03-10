import { Component, Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TranslationAlignmentService } from 'src/app/app-services/translation-alignment.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent {
  public message: string = '';
  constructor(
    private dialog: MatDialogRef<DeleteModalComponent>,
    public translationService: TranslationAlignmentService
    ) {
      this.translationService.languageChange.subscribe(x  => {
        this.translationService.isTranslate = x;
      });
    }
  closeDialog() {
    const dialogRef = this.dialog.close();
  }
  Delete(){
    this.dialog.close(true);
  }
}
