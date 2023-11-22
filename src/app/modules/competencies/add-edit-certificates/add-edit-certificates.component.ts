import { Component, EventEmitter, Input, Output, inject, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Certificates } from 'src/app/models/certificates.model';
import { CompetenciesCommonService } from '../services/competencies-common.service';

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
  constructor(private competenciesService:CompetenciesCommonService){
    this.certiifcateForm = this._formBuilder.group({
      id:[''],
      CertificateTypeId: ['',[Validators.required]],
      Description: [''],
      IssueDate: ['', [Validators.required]],
      ExpirationDate:['',[Validators.required]],
      renewal: [''],
      Note: [''],
      recid:[this.certificate?.recid ? this.certificate?.recid : 0],
      attachment: [''],
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
}
