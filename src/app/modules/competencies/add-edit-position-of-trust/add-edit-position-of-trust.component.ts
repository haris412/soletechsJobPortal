import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { PositionOfTrust } from 'src/app/models/position-of-trust.model';

@Component({
  selector: 'app-add-edit-position-of-trust',
  templateUrl: './add-edit-position-of-trust.component.html',
  styleUrls: ['./add-edit-position-of-trust.component.scss']
})
export class AddEditPositionOfTrustComponent {
  @Input() selectedPositionOfTrust:PositionOfTrust = new Object() as PositionOfTrust;
  @Output() closeSideNav: EventEmitter<any> = new EventEmitter();
  @Output() positionTrustData: EventEmitter<PositionOfTrust> = new EventEmitter();
  psitionTrustForm: UntypedFormGroup;
  private _formBuilder = inject(UntypedFormBuilder);
  skill!: PositionOfTrust;
  fileList:any[]=[];
  file_store!: FileList;
  file:any;
  constructor(){
    this.psitionTrustForm = this._formBuilder.group({
      id: [''],
      employer: ['', [Validators.required]],
      position: ['', [Validators.required]],
      startDate:['', [Validators.required]],
      endDate:['', [Validators.required]],
      notes:['', [Validators.required]],
      attachment:['']
    });
    
  }
  ngOnInIt(){
    if(this.selectedPositionOfTrust.id !== ''){
      this.psitionTrustForm.patchValue({
        ...this.selectedPositionOfTrust
      });
    }
   }
    CloseSideNav: () => void = () => {
      this.closeSideNav.emit(true);
    }
  
    SavePosition: () => void = () => {
      if (this.psitionTrustForm.valid) {
        this.selectedPositionOfTrust = this.psitionTrustForm.getRawValue();
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
      this.fileList = files.target.files;
    }
  
    DeleteFile: (selectedFile:File) => void = () => {
      //this.fileList = this.fileList.filter((file:any)=> file.name !== selectedFile.name);
      this.fileList = [];
    }
}
