import { Component, EventEmitter, Input, Output, inject, OnInit } from '@angular/core';
import { Education } from '../models/education';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { CompetenciesCommonService } from '../services/competencies-common.service';
import { TranslationAlignmentService } from 'src/app/app-services/translation-alignment.service';
import { AppLookUpService } from 'src/app/app-services/app-look-up.service';
import { ToastrService } from 'ngx-toastr';

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
    public lookupService: AppLookUpService,
    private toastrService: ToastrService){
    this.educationForm = this._formBuilder.group({
      id:[''],
      Description: [''],
      EducationDisciplineRecId: ['', [Validators.required]],
      EducationInstitutionId:['',[Validators.required]],
      EducationLevelId:['',[Validators.required]],
      StartDate: ['', [Validators.required]],
      EndDate: ['', [Validators.required]],
      CreditBasis: [2],
      EducationScale:[''],
      EducationAverage:[0,[Validators.required]],
      CreditsCompleted:[0],
      CreditsEarned:[0],
      CreditsNeeded:[0],
      EducationSecondaryEmphasis:[''],
      Notes:[''],
      attachment:[''],
			fileName: ['']
    });
    this.translationService.languageChange.subscribe( x=> {
      this.isTranslate  = x;
      this.ArabicList();
    });
  }
  ngOnInit(){
    if(this.selectedEducation?.EducationDisciplineRecId !== ''){
      this.educationForm.patchValue({
        ...this.selectedEducation,
        CreditBasis:'2'
      });
    }
    this.ArabicList();
    if (this.selectedEducation?.fileName)
      this.GetFilesFromAttachment(this.selectedEducation?.fileName);
   }
    CloseSideNav: () => void = () => {
      this.closeSideNav.emit(true);
    }
  
    SaveEducation: () => void = () => {
      if (this.educationForm.valid) {
        let date2: any;
        if (
          this.educationForm.controls.StartDate.value != undefined &&
          this.educationForm.controls.StartDate.value != null
        ) {
          const date1 = new Date(this.educationForm.controls.StartDate.value);
          if (this.selectedEducation.StartDate) {
            date2 = new Date(this.selectedEducation.StartDate);
          } else {
            date2 = new Date();
          }
          // Parse the birthDate string into a JavaScript Date object
          const originalDate = new Date(
            this.educationForm.controls.StartDate.value
          );
          // Check if originalDate is a valid Date object
          if (
            !isNaN(originalDate.getTime()) &&
            date1?.toISOString() !== date2?.toISOString()
          ) {
            // Add one day to the date
            originalDate.setDate(originalDate.getDate() + 1);
            let startDateControl = this.educationForm.controls.StartDate as any;
            startDateControl.setValue(originalDate.toISOString());
          }
        }
        if (
          this.educationForm.controls.EndDate.value !== undefined &&
          this.educationForm.controls.EndDate.value !== null
        ) {
          let endDate2: any;
          const endDate1 = new Date(this.educationForm.controls.EndDate.value);
          if (this.selectedEducation.EndDate) {
            endDate2 = new Date(this.selectedEducation.EndDate);
          } else {
            endDate2 = new Date();
          }
          // Parse the birthDate string into a JavaScript Date object
          const originalDate = new Date(
            this.educationForm.controls.EndDate.value
          );
          // Check if originalDate is a valid Date object
          if (
            !isNaN(originalDate.getTime()) &&
            endDate1?.toISOString() !== endDate2?.toISOString()
          ) {
            // Add one day to the date
            originalDate.setDate(originalDate.getDate() + 1);
            let endDateControl = this.educationForm.controls.EndDate as any;
            endDateControl.setValue(originalDate.toISOString());
          }
        }
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
            this.educationForm.controls.attachment.setValue(
              this.cvData.substring(
                this.cvData.indexOf('base64,') + 7,
                this.cvData.length
              )
            );
            this.educationForm.controls.fileName.setValue(this.fileCvData.name);
          };
          this.fileList.push(files.target.files[0]);
        }else {
          this.toastrService.error('Only PDF and Word files are allowed');
        }
      } 
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
        this.fileFromAttachments = attachment;
    }

    async DownloadFile() {
      await this.DownloadFromBlob();
    }

    async DownloadFromBlob() {
      var fileData = await this.lookupService.GetAttachmentFromBlob(this.selectedEducation?.fileName);
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
    ArabicList() {
      if (this.translationService.isTranslate) {
        this.educationInstitution = this.competenciesService.educationInstitutionArabicList;
        this.educationLevel =  this.competenciesService.educationLevelArabicList;
        this.educationDiscipline  = this.competenciesService.educationDeciplineArabicList;
      } else {
        this.educationInstitution = this.competenciesService.educationInstitutionList;
        this.educationLevel = this.competenciesService.educationLevelList;
        this.educationDiscipline  = this.competenciesService.educationDesciplineList;
      } 
    }
}