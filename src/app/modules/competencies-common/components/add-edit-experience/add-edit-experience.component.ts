import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { Experience } from '../models/experience';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { CompetenciesCommonService } from '../services/competencies-common.service';
import { professionalExperience } from 'src/app/models/professional-experience.model';
import { TranslationAlignmentService } from 'src/app/app-services/translation-alignment.service';
import { AppLookUpService } from 'src/app/app-services/app-look-up.service';

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
    public lookupService: AppLookUpService) {
    this.experienceForm = this._formBuilder.group({
      employerName: ['', [Validators.required]],
      qualificationPosition: ['', [Validators.required]],
      URL: ['', [Validators.required]],
      phone:['',[Validators.required]],
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
    this.GetFilesFromAttachment(this.selectedExperience?.Attachment);
  }
  CloseSideNav: () => void = () => {
    this.closeSideNav.emit(true);
  }

  SaveExperience: () => void = () => {
    if (this.experienceForm.valid) {
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
    if (files.target.files.length > 0) {
      this.fileCvData = files.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(this.fileCvData);
      reader.onload = () => {
        this.cvData = reader.result;
        this.experienceForm.controls.Attachment.setValue(this.cvData.substring(this.cvData.indexOf('base64,') + 7, this.cvData.length));
        this.experienceForm.controls.fileName.setValue(this.fileCvData?.name);
      };
    }
    this.fileList.push(files.target.files[0]);
  }
  DeleteFile: (selectedFile: File) => void = () => {
    this.fileList = [];
  }
  
  async GetFilesFromAttachment(attachment: string) {
    if (attachment && attachment.includes('soletechsattachmentcontainer')) {
      this.attachBase64 = await this.lookupService.GetAttachmentFromAzure(attachment);
      this.fileFromAttachments = attachment;
    }
  }

  DownloadFile() {
    this.showPdf();
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
