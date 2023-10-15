import { Component } from '@angular/core';

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.scss']
})
export class CertificatesComponent {
  public completed: boolean = true;
  public sidenavOpen: boolean = false;
  public isFile: boolean = false;
  fileList:any[]=[]
  title = 'angular';

  constructor() { }

  ngOnInit(): void {
  }

  OpenSidenav() {
    this.sidenavOpen = true;
    document.body.style.overflow = 'hidden';
  }

  CloseSidenav() {
    this.sidenavOpen = false;
    document.body.style.overflow = 'auto';
  }
  onFileUpload(files: any) {
    this.fileList = files.target.files;
  }

  DeleteFile(selectedFile:File) {
    //this.fileList = this.fileList.filter((file:any)=> file.name !== selectedFile.name);
    this.fileList = [];
  }
}
