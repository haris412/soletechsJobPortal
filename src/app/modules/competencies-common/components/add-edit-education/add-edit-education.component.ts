import { Component, EventEmitter, Input, Output, inject, OnInit } from '@angular/core';
import { Education } from '../models/education';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { CompetenciesCommonService } from '../services/competencies-common.service';
import { TranslationAlignmentService } from 'src/app/app-services/translation-alignment.service';
import { AppLookUpService } from 'src/app/app-services/app-look-up.service';

@Component({
  selector: 'app-add-edit-education',
  templateUrl: './add-edit-education.component.html',
  styleUrls: ['./add-edit-education.component.scss']
})
export class AddEditEducationComponent implements OnInit{
  @Input() selectedEducation:Education = new Object() as Education;
  @Output() closeSideNav: EventEmitter<any> = new EventEmitter();
  @Output() educationData: EventEmitter<Education> = new EventEmitter();
  educationForm: UntypedFormGroup;
  private _formBuilder = inject(UntypedFormBuilder);
  fileList:any[]=[];
  file:any;
  educationInstitution:any[] = [];
  educationLevel:any[] = [];
  educationDiscipline:any[] = [];
  fileCvData: any;
  cvData: any
  fileFromAttachments = '';
  attachBase64: any = '';
  public isTranslate: boolean = this.translationService.isTranslate;
  get f() { return this.educationForm.controls; }
  constructor(
    private competenciesService:CompetenciesCommonService,
    public translationService: TranslationAlignmentService,
    public lookupService: AppLookUpService){
    this.educationForm = this._formBuilder.group({
      id:[''],
      Description: [''],
      EducationDisciplineRecId: ['', [Validators.required]],
      EducationInstitutionId:['',[Validators.required]],
      EducationLevelId:['',[Validators.required]],
      StartDate: ['', [Validators.required]],
      EndDate: ['', [Validators.required]],
      CreditBasis: [2,[Validators.required]],
      EducationScale:[''],
      EducationAverage:[0,[Validators.required]],
      CreditsCompleted:['' ],
      CreditsEarned:[0],
      CreditsNeeded:[''],
      EducationSecondaryEmphasis:[''],
      Notes:[''],
      attachment:[''],
			fileName: ['']
    });
    this.translationService.languageChange.subscribe( x=> {
      this.isTranslate  = x;
    });
  }
  ngOnInit(){
    if(this.selectedEducation?.EducationDisciplineRecId !== ''){
      this.educationForm.patchValue({
        ...this.selectedEducation,
        CreditBasis:this.selectedEducation?.CreditBasis?.toString()
      });
    }
    this.educationInstitution = this.competenciesService.educationInstitutionList;
    this.educationLevel = this.competenciesService.educationLevelList;
    this.educationDiscipline  = this.competenciesService.educationDesciplineList;
    this.GetFilesFromAttachment(this.selectedEducation?.Attachment);
   }
    CloseSideNav: () => void = () => {
      this.closeSideNav.emit(true);
    }
  
    SaveEducation: () => void = () => {
      if (this.educationForm.valid) {
        this.selectedEducation = { ...this.selectedEducation, ...this.educationForm.getRawValue()};
        this.educationData.emit(this.selectedEducation);
      } else {
        this.educationForm.markAllAsTouched();
      }
    }
    Discard: () => void = () => {
      this.educationForm.reset();
      this.fileList = [];
    }
    onFileUpload(files: any) {
      if (files.target.files.length > 0) {
        this.fileCvData = files.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(this.fileCvData);
        reader.onload = () => {
          this.cvData = reader.result;
          this.educationForm.controls.attachment.setValue(this.cvData.substring(this.cvData.indexOf('base64,') + 7, this.cvData.length));
          this.educationForm.controls.fileName.setValue(this.fileCvData.name);
        };
      }
      this.fileList.push(files.target.files[0]);
    }
  
    DeleteFile: (selectedFile:File) => void = () => {
      //this.fileList = this.fileList.filter((file:any)=> file.name !== selectedFile.name);
      this.fileList = [];
    }
    OnEducationChange(event:any){
      this.educationForm.controls.Description.setValue(event?.source?.value);
      this.educationForm.controls.Description.disable();
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