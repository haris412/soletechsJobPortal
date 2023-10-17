import { Component } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-identification',
  templateUrl: './identification.component.html',
  styleUrls: ['./identification.component.scss']
})
export class IdentificationComponent {
  fileList:any[]=[];
  public identificationForm: UntypedFormGroup | undefined;

  onFileUpload(files: any) {
    this.fileList = files.target.files;
  }

  DeleteFile: (selectedFile:File) => void = () => {
    //this.fileList = this.fileList.filter((file:any)=> file.name !== selectedFile.name);
    this.fileList = [];
  }
}
