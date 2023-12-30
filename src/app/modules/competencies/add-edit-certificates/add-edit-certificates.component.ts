import { Component, EventEmitter, Input, Output, inject, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Certificates } from 'src/app/models/certificates.model';
import { CompetenciesCommonService } from '../services/competencies-common.service';
import { TranslationAlignmentService } from 'src/app/app-services/translation-alignment.service';

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
  private _formBuilder = inject(UntypedFormBuilder);
  certificate!: Certificates;
  fileList:any[]=[];
  file:any;
  certificateTypeList:any[] = [];
  public isTranslate: boolean = this.translationService.isTranslate;
  get f() { return this.certiifcateForm.controls; }
  constructor(
    private competenciesService:CompetenciesCommonService,
    public translationService: TranslationAlignmentService
    ){
    this.certiifcateForm = this._formBuilder.group({
      id:[''],
      CertificateTypeId: ['',[Validators.required]],
      Description: [''],
      IssueDate: ['', [Validators.required]],
      ExpirationDate:['',[Validators.required]],
      renewal: ['',[Validators.required]],
      Note: [''],
      recid:[this.selectedCertificate?.recid ? this.selectedCertificate?.recid : 0],
      attachment: [''],
    });
    this.translationService.languageChange.subscribe( x=> {
      this.isTranslate  = x;
    });
  }
  ngOnInit(){
    if(this.certificate?.CertificateTypeId !== ''){
      this.certiifcateForm.patchValue({
        ...this.selectedCertificate
      });
    }
    this.certificateTypeList = this.competenciesService.certificateTypesList;
   }
    CloseSideNav: () => void = () => {
      this.closeSideNav.emit(true);
    }
  
    SaveCertificate: () => void = () => {
      if (this.certiifcateForm.valid) {
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
      this.fileList.push(files.target.files[0]);
    }
  
    DeleteFile: (selectedFile:File) => void = () => {
      //this.fileList = this.fileList.filter((file:any)=> file.name !== selectedFile.name);
      this.fileList = [];
    }
    OnCertificateChange(event:any){
      this.certiifcateForm.controls.Description.setValue(event?.source?.value);
      this.certiifcateForm.controls.Description.disable();
    }
}
