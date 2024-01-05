import { Component, Input } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-careerPageTaskBasic',
  templateUrl: './careerPageTaskBasic.component.html',
  styleUrls: ['./careerPageTaskBasic.component.scss']
})
export class CareerPageTaskBasicComponent {
  fileList:any[]=[];
  public identificationForm: UntypedFormGroup | undefined;
  @Input() taskName: string = '';
  @Input() taskDescription: string = '';

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
}
