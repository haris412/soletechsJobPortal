import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Identification } from 'src/app/models/identification.model';

import { TranslationAlignmentService } from 'src/app/app-services/translation-alignment.service';
import { UserInfoService } from 'src/app/modules/user-info/user-info.service';
import { AppLookUpService } from 'src/app/app-services/app-look-up.service';

@Component({
  selector: 'app-add-edit-identification',
  templateUrl: './add-edit-identification.component.html',
  styleUrls: ['./add-edit-identification.component.scss']
})
export class AddEditIdentificationComponent implements OnInit {
  public isTranslate: boolean = this.translationService.isTranslate;
  @Input() selectedIdentification: Identification = new Object() as Identification;
  @Output() closeSideNav: EventEmitter<any> = new EventEmitter();
  @Output() identificationData: EventEmitter<Identification> = new EventEmitter();
  identificationForm: UntypedFormGroup;
  isFile: boolean = false;
  fileList: any[] = [];
  private _formBuilder = inject(UntypedFormBuilder);
  identification!: Identification;
  fileFromAttachments = '';
  attachBase64: any = '';
  fileCvData: any;
  cvData: any;
  identificationType:any[]=[];
  get f() { return this.identificationForm.controls; }
  constructor(
    public userInfoService: UserInfoService,
    public translationService: TranslationAlignmentService,
    public lookupService: AppLookUpService,
    private toastrService: ToastrService,

    ) {
    this.identificationForm = this._formBuilder.group({
      IdentificationType: ['', [Validators.required]],
      IdentificationNumber: ['', [Validators.required, Validators.maxLength(10)]],
      IssueDate: ['', [Validators.required]],
      ExpirationDate: ['', [Validators.required]],
      recId: [this.selectedIdentification?.recId ? this.selectedIdentification?.recId : 0],
      Attachment: [''],
      fileName: ['']
    });
    this.translationService.languageChange.subscribe(x => {
      this.isTranslate = x;
      this.ArabicList();
    });
  }
  ngOnInit() {
    this.ArabicList();
    if (this.selectedIdentification != undefined) {
      this.identificationForm.patchValue({
        ...this.selectedIdentification
      });
    } else {
      this.identificationForm.reset();
    }
    if (this.selectedIdentification?.fileName)
      this.GetFilesFromAttachment(this.selectedIdentification?.fileName);
  }
  CloseIdentificationNav: () => void = () => {
    this.closeSideNav.emit(true);
  }

  SaveIdentification: () => void = () => {
    if (this.identificationForm.valid) {
      this.identification = this.identificationForm.getRawValue();
      this.identificationData.emit(this.identification);
    } else {
      this.identificationForm.markAllAsTouched();
    }
  }
  Discard: () => void = () => {
    this.identificationForm.reset();
  }
  onFileUpload(files: any) {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    if (files.target.files.length > 0) {
      this.fileCvData = files.target.files[0];
      if (this.fileCvData && allowedTypes.includes(this.fileCvData?.type)) {
        const reader = new FileReader();
        reader.readAsDataURL(this.fileCvData);
        reader.onload = () => {
          this.cvData = reader.result;
          this.identificationForm.controls.Attachment.setValue(
            this.cvData.substring(
              this.cvData.indexOf('base64,') + 7,
              this.cvData.length
            )
          );
          this.identificationForm.controls.fileName.setValue(
            this.fileCvData.name
          );
        };
        this.fileList.push(files.target.files[0]);
      } else {
        this.toastrService.error('Only PDF and Word files are allowed');
      }
    }
  }

  DeleteFile(selectedFile: File) {
    this.fileList = [];
  }
  async GetFilesFromAttachment(attachment: string) {
    this.fileFromAttachments = attachment;
  }

  async DownloadFile() {
    await this.DownloadFromBlob();
  }

  async DownloadFromBlob() {
    var fileData = await this.lookupService.GetAttachmentFromBlob(this.selectedIdentification?.fileName);
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
      this.identificationType = this.userInfoService.identificationTypeArabic;
    } else {
      this.identificationType = this.userInfoService.identificationType;
    } 
  }
}
