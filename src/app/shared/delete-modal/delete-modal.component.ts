import { Component, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent {
  public message: string = '';
  constructor(private dialog: MatDialog) {}

  openConfirmationDialog(message: string): Promise<boolean> {
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      width: '250px',
      data: { message },
    });

    return dialogRef
      .afterClosed()
      .toPromise()
      .then((result: boolean) => {
        return result;
      });
  }
}
