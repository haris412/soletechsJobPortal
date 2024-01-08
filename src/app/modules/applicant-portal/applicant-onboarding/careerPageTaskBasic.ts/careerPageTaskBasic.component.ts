import { Component, Input } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslationAlignmentService } from 'src/app/app-services/translation-alignment.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import Swal from 'sweetalert2';

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
  @Input() activityDurationIndex: number = -1;
  @Input() careerTaskIndex: number = -1;

  onFileUpload(files: any) {
    this.fileList = files.target.files;
  }

  DeleteFile: (selectedFile:File) => void = () => {
    //this.fileList = this.fileList.filter((file:any)=> file.name !== selectedFile.name);
    this.fileList = [];
  }
  public isFile: boolean = false;
  constructor(private router:Router,
              public shared: SharedService,
              public translationService: TranslationAlignmentService){}

  GoToJobDetail(){
    this.router.navigate(['/jobs']);
  }

  markAsComplete() {
    Swal.fire({
      title: 'Alert',
      icon: 'info',
      text: 'Are you sure you want to complete it?',
      confirmButtonText: 'Ok'
    }).then((result) => {
      if (result['isConfirmed']){
        this.shared.durationGroups[this.activityDurationIndex].applicantOnboardingTasks[this.careerTaskIndex].markAsComplete = true;
      }
      });
  }
}
