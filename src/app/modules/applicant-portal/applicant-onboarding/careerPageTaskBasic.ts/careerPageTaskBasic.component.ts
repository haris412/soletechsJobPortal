import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslationAlignmentService } from 'src/app/app-services/translation-alignment.service';
import { LookUpDto } from 'src/app/models/lookup-dto.model';
import { SharedService } from 'src/app/shared/services/shared.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-careerPageTaskBasic',
  templateUrl: './careerPageTaskBasic.component.html',
  styleUrls: ['./careerPageTaskBasic.component.scss'],
})
export class CareerPageTaskBasicComponent implements OnInit {
  fileList: any[] = [];
  public identificationForm: UntypedFormGroup | undefined;
  @Input() activityDurationIndex: number = -1;
  @Input() careerTaskIndex: number = -1;
  instructionsItems: string[] = [];
  public inProgress: boolean = true;
  public applicationStatus: string = 'Change status';
  statusList:LookUpDto[]= [];
  statusListEng:LookUpDto[] = [{name:'in progress',value:'inprogress'},{name:'Completed',value:'completed'}]
  statusarabicList:LookUpDto[] = [ {name: 'جاري العمل',value:'inprogress'} ,{name:'تم الإنتهاء',value:'completed'}];
  onFileUpload(files: any) {
    this.fileList = files.target.files;
  }

  DeleteFile: (selectedFile: File) => void = () => {
    //this.fileList = this.fileList.filter((file:any)=> file.name !== selectedFile.name);
    this.fileList = [];
  };
  public isFile: boolean = false;
  constructor(
    private router: Router,
    public shared: SharedService,
    public translationService: TranslationAlignmentService
  ) {
    this.translationService.languageChange.subscribe((x) => {
      this.SetTaskData();
    });
  }

  ngOnInit() {
    this.SetTaskData();
  }

  SetTaskData() {
    if (
      this.shared.durationGroups[this.activityDurationIndex] &&
      this.shared.durationGroups[this.activityDurationIndex]
        .applicantOnboardingTasks[this.careerTaskIndex]
    ) {
      this.instructionsItems = [];
      if (
        this.shared.durationGroups[this.activityDurationIndex]
          .applicantOnboardingTasks[this.careerTaskIndex].instructions
      ) {
        if (
          this.shared.durationGroups[
            this.activityDurationIndex
          ].applicantOnboardingTasks[
            this.careerTaskIndex
          ].instructions.includes(':')
        ) {
          let parentInstruction =
            this.shared.durationGroups[
              this.activityDurationIndex
            ].applicantOnboardingTasks[this.careerTaskIndex].instructions.split(
              ':'
            );
          if (parentInstruction.length > 1) {
            this.instructionsItems.push(parentInstruction[0] + ':');
            this.prepareInstruction(parentInstruction[1], '.');
          } else {
            this.prepareInstruction(
              this.shared.durationGroups[this.activityDurationIndex]
                .applicantOnboardingTasks[this.careerTaskIndex].instructions,
              '.'
            );
          }
        } else {
          this.prepareInstruction(
            this.shared.durationGroups[this.activityDurationIndex]
              .applicantOnboardingTasks[this.careerTaskIndex].instructions,
            '.'
          );
        }
      }
    }
    if (this.translationService.isTranslate) {
      this.statusList = this.statusarabicList;
      if (this.applicationStatus === 'Change status') {
        this.applicationStatus = 'تغير الحالة';
      } else if (this.applicationStatus === 'In Progress') {
        this.applicationStatus = 'جاري العمل';
      } else if (this.applicationStatus === 'Completed') {
        this.applicationStatus = 'تم الإنتهاء';
      }
    } else {
      this.statusList = this.statusListEng;
      if (this.applicationStatus === 'تغير الحالة') {
        this.applicationStatus = 'Change status';
      } else if (this.applicationStatus === 'جاري العمل') {
        this.applicationStatus = 'In Progress';
      } else if (this.applicationStatus === 'تم الإنتهاء') {
        this.applicationStatus = 'Completed';
      }
    }
  }

  prepareInstruction(instruction: string, delimeter: string) {
    if (instruction.includes('.')) {
      let instructionsList = instruction.split(delimeter);
      for (let ins of instructionsList) {
        if (ins) {
          this.instructionsItems.push(ins + '.');
        }
      }
    } else {
      this.instructionsItems.push(instruction);
    }
  }

  markAsCompleted() {
    Swal.fire({
      title: this.translationService.isTranslate ? 'يُحذًِر':'Alert',
      icon: 'info',
      text: this.translationService.isTranslate ? 'هل أنت متأكد أنك تريد إكماله' : 'Are you sure you want to complete it?',
      confirmButtonText: this.translationService.isTranslate ? 'نعم':'Ok',
    }).then((result) => {
      if (result['isConfirmed']) {
        this.applicationStatus = this.translationService.isTranslate ?  'تم الإنتهاء' : 'Completed' ;
        this.shared.durationGroups[
          this.activityDurationIndex
        ].applicantOnboardingTasks[this.careerTaskIndex].markAsComplete = true;
      }
    });
  }
  OnboardingStatus(status: string): string {
    if (status.toLowerCase() === 'inprogress') {
      this.inProgress = true;
      this.applicationStatus = 
      this.translationService.isTranslate ?  'جاري العمل' : 'In Progress' ;
      this.shared.durationGroups[
        this.activityDurationIndex
      ].applicantOnboardingTasks[this.careerTaskIndex].markAsComplete = false;
    } else if (status.toLowerCase() === 'completed') {
      this.inProgress = false;
      this.markAsCompleted();
    }
    return this.applicationStatus;
  }
  GetStatus(status: boolean) {
    if(status === undefined && this.applicationStatus !== 'Completed' && this.applicationStatus !== 'In Progress'){
       this.applicationStatus =  this.translationService.isTranslate ? 'تغير الحالة' : 'Change status'  ;
       return  '';
    }
    if (status) {
      this.applicationStatus = this.translationService.isTranslate ?  'تم الإنتهاء' : 'Completed' ;
      return this.translationService.isTranslate ? 'تم الإنتهاء' : 'completed';
    } else {
      this.applicationStatus = 
      this.translationService.isTranslate ?  'جاري العمل' : 'In Progress' ;
      return this.translationService.isTranslate ? 'قيد الانتظار' : 'pendinng';
    }
    
  }
}
