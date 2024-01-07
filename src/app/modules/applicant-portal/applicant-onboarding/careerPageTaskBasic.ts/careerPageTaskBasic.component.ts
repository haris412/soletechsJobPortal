import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-careerPageTaskBasic',
  templateUrl: './careerPageTaskBasic.component.html',
  styleUrls: ['./careerPageTaskBasic.component.scss']
})
export class CareerPageTaskBasicComponent implements OnInit {
  fileList:any[]=[];
  public identificationForm: UntypedFormGroup | undefined;
  @Input() taskName: string = '';
  @Input() taskDescription: string = '';
  @Input() instructions: string = '';
  @Input() activityDurationIndex: number = -1;
  @Input() careerTaskIndex: number = -1;
  instructionsItems: string[] = [];

  onFileUpload(files: any) {
    this.fileList = files.target.files;
  }

  DeleteFile: (selectedFile:File) => void = () => {
    //this.fileList = this.fileList.filter((file:any)=> file.name !== selectedFile.name);
    this.fileList = [];
  }
  public isFile: boolean = false;
  constructor(private router:Router,
              public shared: SharedService){}

  ngOnInit() {
    if (this.instructions) {
      if (this.instructions.includes(':')) {
        let parentInstruction = this.instructions.split(':');
        if (parentInstruction.length > 1) {
          this.instructionsItems.push(parentInstruction[0] + ":");
          this.prepareInstruction(parentInstruction[1], '.');
        } else {
          this.prepareInstruction(this.instructions, '.');
        }
      } else {
        this.prepareInstruction(this.instructions, '.');
      }
    }
  }

  prepareInstruction(instruction: string, delimeter: string) {
    if(instruction.includes('.')) {
      let instructionsList = instruction.split(delimeter);
      for(let ins of instructionsList) {
        if (ins) {
          this.instructionsItems.push(ins + '.');
        }
      }
    } else {
      this.instructionsItems.push(instruction);
    }
  }

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
