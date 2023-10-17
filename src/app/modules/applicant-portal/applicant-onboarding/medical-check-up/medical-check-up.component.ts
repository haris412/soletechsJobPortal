import { Component } from '@angular/core';

@Component({
  selector: 'app-medical-check-up',
  templateUrl: './medical-check-up.component.html',
  styleUrls: ['./medical-check-up.component.scss']
})
export class MedicalCheckUpComponent {
  fileList:any[]=[];
  onFileUpload(files: any) {
    this.fileList = files.target.files;
  }

  DeleteFile: (selectedFile:File) => void = () => {
    //this.fileList = this.fileList.filter((file:any)=> file.name !== selectedFile.name);
    this.fileList = [];
  }
}
