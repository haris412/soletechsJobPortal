import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';

@Injectable({
  providedIn: 'root',
})
export class DeleteModalComponentService {
  constructor(private dialog: MatDialog) {}

  openDialog(message: string): MatDialogRef<DeleteModalComponent> {
    return this.dialog.open(DeleteModalComponent, {
      data: { message },
      width: '375',
      disableClose: true,
    });
  }
}