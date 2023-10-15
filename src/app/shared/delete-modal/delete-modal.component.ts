import { Component, Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent {
  public message: string = '';
  constructor(private dialog: MatDialogRef<DeleteModalComponent>) {}
  closeDialog() {
    const dialogRef = this.dialog.close();
  }
  Delete(){
    this.dialog.close(true);
  }
}
