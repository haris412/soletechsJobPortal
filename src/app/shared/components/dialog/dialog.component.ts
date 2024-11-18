import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CVReaderData } from 'src/app/models/cVReaderData';

export type DialogDataSubmitCallback<T> = (row: T) => void;

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styles: [
    `
      .w-100 {
        width: 100%;
      }
    `
  ]
})
export class DialogComponent {
  cvData: any;
  name: string = '';
  email: string = '';
  experience: string = '';
  skills: string ='';

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { defaultValue: CVReaderData[] },
    private dialogRef: MatDialogRef<DialogComponent>
  ) {}

  ngOnInit() {
    if (this.data.defaultValue) {
      //this.cvData = JSON.stringify(this.data.defaultValue);
    }
  }
}
