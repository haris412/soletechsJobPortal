import { Component } from '@angular/core';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent {
  fileList:any[]=[];
  onFileUpload(files: any) {
    this.fileList = files.target.files;
  }

  DeleteFile: (selectedFile:File) => void = () => {
    //this.fileList = this.fileList.filter((file:any)=> file.name !== selectedFile.name);
    this.fileList = [];
  }
}
