import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quick-apply',
  templateUrl: './quick-apply.component.html',
  styleUrls: ['./quick-apply.component.scss']
})
export class QuickApplyComponent {
  public isFile: boolean = false;
  public fileList: File[] = [];
  constructor(
    private router: Router
  ) {}

  OnInIt(){
    this.fileList = [];
  }
  Back() {
    this.router.navigate(['/'])
  }

  onFileUpload(files: any) {
    debugger;
    this.fileList = files.target.files;
  }

  DeleteFile(selectedFile:File) {
    debugger;
    this.fileList = this.fileList.filter((file:any)=> file.name !== selectedFile.name);
    //this.fileList = [];
  }
}
