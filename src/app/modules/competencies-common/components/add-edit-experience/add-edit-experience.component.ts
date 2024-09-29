import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { Experience } from '../models/experience';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { CompetenciesCommonService } from '../services/competencies-common.service';
import { professionalExperience } from 'src/app/models/professional-experience.model';
import { TranslationAlignmentService } from 'src/app/app-services/translation-alignment.service';
import { AppLookUpService } from 'src/app/app-services/app-look-up.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit-experience',
  templateUrl: './add-edit-experience.component.html',
  styleUrls: ['./add-edit-experience.component.scss']
})
export class AddEditExperienceComponent implements OnInit {
  @Input() selectedExperience: professionalExperience = new Object() as professionalExperience;
  @Output() closeSideNav: EventEmitter<any> = new EventEmitter();
  @Output() experienceData: EventEmitter<professionalExperience> = new EventEmitter();
  experienceForm: UntypedFormGroup;
  private _formBuilder = inject(UntypedFormBuilder);
  skill!: Experience;
  fileList: any[] = [];
  file_store!: FileList;
  file: any;
  fileCvData: any;
  cvData: any
  fileFromAttachments = '';
  attachBase64: any = '';
  public isTranslate: boolean = this.translationService.isTranslate;
  get f() { return this.experienceForm.controls; }
  constructor(
    public translationService: TranslationAlignmentService,
    public lookupService: AppLookUpService,
    private toastrService: ToastrService) {
    this.experienceForm = this._formBuilder.group({
      employerName: ['', [Validators.required]],
      qualificationPosition: ['', [Validators.required]],
      URL: [''],
      phone:[''],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      notes: [''],
      Attachment:[''],
			fileName: ['']
    });
    this.translationService.languageChange.subscribe( x=> {
      this.isTranslate  = x;
    });
  }
  ngOnInit() {
    this.experienceForm.reset();
    if (this.selectedExperience?.employerName !== '') {
      this.experienceForm.patchValue({
        ...this.selectedExperience
      });
    }
    if (this.selectedExperience?.fileName)
      this.GetFilesFromAttachment(this.selectedExperience?.fileName);
  }
  CloseSideNav: () => void = () => {
    this.closeSideNav.emit(true);
  }

  SaveExperience: () => void = () => {
    if (this.experienceForm.valid) {
      let date2:any;
      if (this.experienceForm.controls.startDate.value != undefined && this.experienceForm.controls.startDate.value != null) {
        const date1 = new Date(this.experienceForm.controls.startDate.value);
        if (this.selectedExperience.startDate) {
          date2 = new Date(this.selectedExperience.startDate);
        } else {
          date2 = new Date();
        }
        // Parse the birthDate string into a JavaScript Date object
        const originalDate = new Date(this.experienceForm.controls.startDate.value);
        // Check if originalDate is a valid Date object
        if (!isNaN(originalDate.getTime()) && (date1?.toISOString() !== date2?.toISOString())) {
            // Add one day to the date
            originalDate.setDate(originalDate.getDate() + 1);
            let startDateControl = this.experienceForm.controls.startDate as any;
            startDateControl.setValue(originalDate.toISOString());
        }
      }
    if(this.experienceForm.controls.endDate.value !==undefined  && this.experienceForm.controls.endDate.value !==null) {
      let  endDate2:any;
      const endDate1 = new Date(this.experienceForm.controls.endDate.value);
      if (this.selectedExperience.endDate) {
        endDate2 = new Date(this.selectedExperience.endDate);
      } else {
        endDate2 = new Date();
      }
      // Parse the birthDate string into a JavaScript Date object
      const originalDate = new Date(this.experienceForm.controls.endDate.value);
      // Check if originalDate is a valid Date object
      if (!isNaN(originalDate.getTime()) && (endDate1?.toISOString() !== endDate2?.toISOString())) {
          // Add one day to the date
          originalDate.setDate(originalDate.getDate() + 1);
          let endDateControl = this.experienceForm.controls.endDate as any;
          endDateControl.setValue(originalDate.toISOString());
      }
    
  }
      this.selectedExperience = { ...this.selectedExperience, ...this.experienceForm.getRawValue()};

      this.experienceData.emit(this.selectedExperience);
    } else {
      this.experienceForm.markAllAsTouched();
    }
  }
  Discard: () => void = () => {
    this.experienceForm.reset();
    this.fileList = [];
  }
  onFileUpload(files: any) {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    if (files?.target?.files?.length > 0) {
      this.fileCvData = files.target.files[0];
      if (this.fileCvData && allowedTypes.includes(this.fileCvData?.type)) {
        const reader = new FileReader();
        reader.readAsDataURL(this.fileCvData);
        reader.onload = () => {
          this.cvData = reader.result;
          this.experienceForm.controls.Attachment.setValue(
            this.cvData.substring(
              this.cvData.indexOf('base64,') + 7,
              this.cvData.length
            )
          );
          this.experienceForm.controls.fileName.setValue(this.fileCvData?.name);
        };
        this.fileList.push(files.target.files[0]);
      }else {
        this.toastrService.error('Only PDF and Word files are allowed');
      }
    } 
  }
  DeleteFile: (selectedFile: File) => void = () => {
    this.fileList = [];
  }
  
  async GetFilesFromAttachment(attachment: string) {
    this.fileFromAttachments = attachment;
  }

  async DownloadFile() {
    await this.DownloadFromBlob();
  }

  async DownloadFromBlob() {
    var fileData = await this.lookupService.GetAttachmentFromBlob(this.selectedExperience?.fileName);
    if (fileData) {
      this.attachBase64 = fileData;
      this.showPdf()
    }
  }

  showPdf() {
    const linkSource =
      'data:application/octet-stream;base64,' + this.attachBase64?.value;
    const downloadLink = document.createElement('a');
    const fileName = this.fileFromAttachments.substring(this.fileFromAttachments.lastIndexOf('/') + 1, this.fileFromAttachments.length);

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }
}
