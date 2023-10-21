import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Certificates } from 'src/app/models/certificates.model';

@Component({
  selector: 'app-add-edit-certificates',
  templateUrl: './add-edit-certificates.component.html',
  styleUrls: ['./add-edit-certificates.component.scss']
})
export class AddEditCertificatesComponent {
  @Input() selectedCertificate:Certificates = new Object() as Certificates;
  @Output() closeSideNav: EventEmitter<any> = new EventEmitter();
  @Output() educationData: EventEmitter<Certificates> = new EventEmitter();
  certiifcateForm: UntypedFormGroup;
  private _formBuilder = inject(UntypedFormBuilder);
  certificate!: Certificates;
  fileList:any[]=[];
  file:any;
  constructor(){
    this.certiifcateForm = this._formBuilder.group({
      id:[''],
      certificate: ['',[Validators.required]],
      description: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate:['',[Validators.required]],
      requireRenewal: [''],
      Notes: [''],
      attachment: [''],
    });
    
  }
  ngOnInIt(){
    if(this.certificate.certificate !== ''){
      this.certiifcateForm.patchValue({
        ...this.selectedCertificate
      });
    }
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
