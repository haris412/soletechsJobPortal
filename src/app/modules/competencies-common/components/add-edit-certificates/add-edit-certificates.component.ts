import { Component, EventEmitter, Input, Output, inject, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Certificates } from 'src/app/models/certificates.model';
import { CompetenciesCommonService } from '../services/competencies-common.service';
import { TranslationAlignmentService } from 'src/app/app-services/translation-alignment.service';
import { AppLookUpService } from 'src/app/app-services/app-look-up.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit-certificates',
  templateUrl: './add-edit-certificates.component.html',
  styleUrls: ['./add-edit-certificates.component.scss']
})
export class AddEditCertificatesComponent implements OnInit {
  @Input() selectedCertificate:Certificates = new Object() as Certificates;
  @Output() closeSideNav: EventEmitter<any> = new EventEmitter();
  @Output() educationData: EventEmitter<Certificates> = new EventEmitter();
  certiifcateForm: UntypedFormGroup;
  toggleValue: any;
  private _formBuilder = inject(UntypedFormBuilder);
  certificate!: Certificates;
  fileList:any[]=[];
  file:any;
  fileCvData: any;
  cvData: any;
  fileFromAttachments = '';
  certificateTypeList:any[] = [];
  attachBase64: any = '';
  public isTranslate: boolean = this.translationService.isTranslate;
  get f() { return this.certiifcateForm.controls; }
  constructor(
    private competenciesService:CompetenciesCommonService,
    public translationService: TranslationAlignmentService,
    public lookupService: AppLookUpService,
    private toastrService: ToastrService
    ){
    this.certiifcateForm = this._formBuilder.group({
      id:[''],
      CertificateTypeId: ['',[Validators.required]],
      Description: [''],
      IssueDate: ['', [Validators.required]],
      ExpirationDate:['',[Validators.required]],
      renewal: [''],
      Note: [''],
      recid:[this.selectedCertificate?.recid ? this.selectedCertificate?.recid : 0],
      attachment:[''],
			fileName: ['']
    });
    this.translationService.languageChange.subscribe( x=> {
      this.isTranslate  = x;
      this.ArabicList();
    });
  }
  ngOnInit(){
    this.ArabicList();
    if(this.certificate?.CertificateTypeId !== ''){
      this.certiifcateForm.patchValue({
        ...this.selectedCertificate
      });
    }
    
    this.GetFilesFromAttachment(this.selectedCertificate?.Attachment);
   }
    CloseSideNav: () => void = () => {
      this.closeSideNav.emit(true);
    }
  
    SaveCertificate: () => void = () => {
      if (this.certiifcateForm.valid) {
        let date2: any;
        if (
          this.certiifcateForm.controls.IssueDate.value != undefined &&
          this.certiifcateForm.controls.IssueDate.value != null
        ) {
          const date1 = new Date(this.certiifcateForm.controls.IssueDate.value);
          if (this.selectedCertificate.IssueDate) {
            date2 = new Date(this.selectedCertificate.IssueDate);
          } else {
            date2 = new Date();
          }
          // Parse the birthDate string into a JavaScript Date object
          const originalDate = new Date(
            this.certiifcateForm.controls.IssueDate.value
          );
          // Check if originalDate is a valid Date object
          if (
            !isNaN(originalDate.getTime()) &&
            date1?.toISOString() !== date2?.toISOString()
          ) {
            // Add one day to the date
            originalDate.setDate(originalDate.getDate() + 1);
            let startDateControl = this.certiifcateForm.controls.IssueDate as any;
            startDateControl.setValue(originalDate.toISOString());
          }
        }
        if (
          this.certiifcateForm.controls.ExpirationDate.value !== undefined &&
          this.certiifcateForm.controls.ExpirationDate.value !== null
        ) {
          let endDate2: any;
          const endDate1 = new Date(this.certiifcateForm.controls.ExpirationDate.value);
          if (this.selectedCertificate.ExpirationDate) {
            endDate2 = new Date(this.selectedCertificate.ExpirationDate );
          } else {
            endDate2 = new Date();
          }
          // Parse the birthDate string into a JavaScript Date object
          const originalDate = new Date(
            this.certiifcateForm.controls.ExpirationDate.value
          );
          // Check if originalDate is a valid Date object
          if (
            !isNaN(originalDate.getTime()) &&
            endDate1?.toISOString() !== endDate2?.toISOString()
          ) {
            // Add one day to the date
            originalDate.setDate(originalDate.getDate() + 1);
            let endDateControl = this.certiifcateForm.controls.ExpirationDate as any;
            endDateControl.setValue(originalDate.toISOString());
          }
        }
        this.selectedCertificate = this.certiifcateForm.getRawValue();
        this.educationData.emit(this.selectedCertificate);
      } else {
        this.certiifcateForm.markAllAsTouched();
      }
    }
    Discard: () => void = () => {
      this.certiifcateForm.reset();
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
            this.certiifcateForm.controls.attachment.setValue(
              this.cvData.substring(
                this.cvData.indexOf('base64,') + 7,
                this.cvData.length
              )
            );
            this.certiifcateForm.controls.fileName.setValue(
              this.fileCvData.name
            );
          };
          this.fileList.push(files.target.files[0]);
        } else {
          this.toastrService.error('Only PDF and Word files are allowed');
        }
      }
    }
  
    DeleteFile: (selectedFile:File) => void = () => {
      //this.fileList = this.fileList.filter((file:any)=> file.name !== selectedFile.name);
      this.fileList = [];
    }
    OnCertificateChange(event:any){
      this.certiifcateForm.controls.Description.setValue(event?.source?.value);
      this.certiifcateForm.controls.Description.disable();
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
    ArabicList() {
      if (this.translationService.isTranslate) {
        this.certificateTypeList = this.competenciesService.certificateTypesArabicList;
      } else {
        this.certificateTypeList = this.competenciesService.certificateTypesList;
      } 
    }
}
