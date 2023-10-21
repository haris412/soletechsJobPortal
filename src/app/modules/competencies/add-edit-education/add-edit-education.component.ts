import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Education } from '../models/education';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-edit-education',
  templateUrl: './add-edit-education.component.html',
  styleUrls: ['./add-edit-education.component.scss']
})
export class AddEditEducationComponent {
  @Input() selectedEducation:Education = new Object() as Education;
  @Output() closeSideNav: EventEmitter<any> = new EventEmitter();
  @Output() educationData: EventEmitter<Education> = new EventEmitter();
  educationForm: UntypedFormGroup;
  private _formBuilder = inject(UntypedFormBuilder);
  skill!: Education;
  fileList:any[]=[];
  file:any;
  constructor(){
    this.educationForm = this._formBuilder.group({
      id:[''],
      education: ['',[Validators.required]],
      description: ['', [Validators.required]],
      levelOfEducation: ['', [Validators.required]],
      Emphasis:[''],
      Institution: [''],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      average:[''],
      scale:[''],
      credits: [''],
      hoursbasis: [''],
      hourscompleted:['' ],
      hoursrequired:['', ],
      notes:[''],
      attachment:['']
    });
    
  }
  ngOnInIt(){
    if(this.selectedEducation.education !== ''){
      this.educationForm.patchValue({
        ...this.selectedEducation
      });
    }
   }
    CloseSideNav: () => void = () => {
      this.closeSideNav.emit(true);
    }
  
    SaveEducation: () => void = () => {
      if (this.educationForm.valid) {
        this.selectedEducation = this.educationForm.getRawValue();
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
      this.fileList.push(files.target.files[0]);
    }
  
    DeleteFile: (selectedFile:File) => void = () => {
      //this.fileList = this.fileList.filter((file:any)=> file.name !== selectedFile.name);
      this.fileList = [];
    }
}