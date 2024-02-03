import { Component } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-identificationOnboarding',
  templateUrl: './identification.component.html',
  styleUrls: ['./identification.component.scss']
})
export class IdentificationComponent {
  fileList:any[]=[];
  public identificationForm: UntypedFormGroup | undefined;
  fileFromAttachments = '';

  onFileUpload(files: any) {
    this.fileList = files.target.files;
  }

  DeleteFile: (selectedFile:File) => void = () => {
    //this.fileList = this.fileList.filter((file:any)=> file.name !== selectedFile.name);
    this.fileList = [];
  }
  public isFile: boolean = false;
  constructor(private router:Router){}

  GoToJobDetail(){
    this.router.navigate(['/jobs']);
  }
  GetFilesFromAttachment(attachment: string) {
    if (attachment.includes('soletechsattachmentcontainer')) {
      /// call to get data from Azure
      this.fileFromAttachments = attachment;
    }
  }
}
