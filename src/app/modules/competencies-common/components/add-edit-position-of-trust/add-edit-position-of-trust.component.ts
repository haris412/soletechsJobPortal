import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Country } from 'ngx-mat-intl-tel-input/lib/model/country.model';
import { ToastrService } from 'ngx-toastr';
import { AppLookUpService } from 'src/app/app-services/app-look-up.service';
import { TranslationAlignmentService } from 'src/app/app-services/translation-alignment.service';
import { ApplicantRefrence } from 'src/app/models/position-of-trust.model';

@Component({
  selector: 'app-add-edit-position-of-trust',
  templateUrl: './add-edit-position-of-trust.component.html',
  styleUrls: ['./add-edit-position-of-trust.component.scss']
})
export class AddEditPositionOfTrustComponent implements OnInit{
  @Input() selectedPositionOfTrust:ApplicantRefrence = new Object() as ApplicantRefrence;
  @Output() closeSideNav: EventEmitter<any> = new EventEmitter();
  @Output() positionTrustData: EventEmitter<ApplicantRefrence> = new EventEmitter();
  psitionTrustForm: UntypedFormGroup;
  private _formBuilder = inject(UntypedFormBuilder);
  fileList:any[]=[];
  file_store!: FileList;
  file:any;
  fileCvData: any;
  cvData: any
  fileFromAttachments = '';
  public isTranslate: boolean = this.translationService.isTranslate;
  attachBase64: any = '';
  phonePlaceHolder:any;
  get f() { return this.psitionTrustForm.controls; }
  constructor(public translationService: TranslationAlignmentService,
              public lookupService: AppLookUpService,
              private toastrService: ToastrService){
    this.psitionTrustForm = this._formBuilder.group({
      id: [''],
      Employment:['',[Validators.required]],
      Position:['',[Validators.required]],
      EmailAddress:['',[Validators.required]],
      Company:['',[Validators.required]],
      MobileNo:['',[Validators.required]],
      Notes:[''],
      attachment:[''],
			fileName: ['']
    });
    this.translationService.languageChange.subscribe( x=> {
      this.isTranslate  = x;
    });
    
  }
  ngOnInit(){
    if(this.selectedPositionOfTrust){
      this.psitionTrustForm.patchValue({
        ...this.selectedPositionOfTrust
      });
    }
    if (this.selectedPositionOfTrust?.fileName)
      this.GetFilesFromAttachment(this.selectedPositionOfTrust?.fileName);
   }
    CloseSideNav: () => void = () => {
      this.closeSideNav.emit(true);
    }
  
    SavePosition: () => void = () => {
      if (this.psitionTrustForm.valid) {
        this.selectedPositionOfTrust = { ...this.selectedPositionOfTrust, ...this.psitionTrustForm.getRawValue()};
        this.positionTrustData.emit(this.selectedPositionOfTrust);
      } else {
        this.psitionTrustForm.markAllAsTouched();
      }
    }
    Discard: () => void = () => {
      this.psitionTrustForm.reset();
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
            this.psitionTrustForm.controls.attachment.setValue(
              this.cvData.substring(
                this.cvData.indexOf('base64,') + 7,
                this.cvData.length
              )
            );
            this.psitionTrustForm.controls.fileName.setValue(
              this.fileCvData.name
            );
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

    async GetFilesFromAttachment(attachment: string) {
      this.fileFromAttachments = attachment;
    }

    async DownloadFile() {
      await this.DownloadFromBlob();
    }

    async DownloadFromBlob() {
      var fileData = await this.lookupService.GetAttachmentFromBlob(this.selectedPositionOfTrust?.fileName);
      if (fileData) {
        this.attachBase64 = fileData;
        this.showPdf()
      }
    }

    OnCountryChanged(event:Country){
      this.phonePlaceHolder = event?.placeHolder;
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
