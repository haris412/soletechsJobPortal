import { Component, EventEmitter, Input, Output, inject, OnInit } from '@angular/core';
import { Education } from '../models/education';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { CompetenciesCommonService } from '../services/competencies-common.service';

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
  skill!: Education;
  fileList:any[]=[];
  file:any;
  educationInstitution:any[] = [];
  educationLevel:any[] = [];
  educationDiscipline:any[] = [];
  constructor(private competenciesService:CompetenciesCommonService){
    this.educationForm = this._formBuilder.group({
      id:[''],
      Description: [''],
      EducationDisciplineRecId: ['', [Validators.required]],
      EducationInstitutionId:['',[Validators.required]],
      EducationLevelId:['',[Validators.required]],
      StartDate: ['', [Validators.required]],
      EndDate: ['', [Validators.required]],
      EducationScale:[''],
      CreditBasis: [2],
      EducationAverage:[0],
      CreditsCompleted:['' ],
      CreditsEarned:[0],
      CreditsNeeded:[''],
      EducationSecondaryEmphasis:[''],
      Notes:[''],
      attachment:['']
    });
    
  }
  ngOnInit(){
    if(this.selectedEducation?.EducationDisciplineRecId !== ''){
      this.educationForm.patchValue({
        ...this.selectedEducation
      });
    }
    this.educationInstitution = this.competenciesService.educationInstitutionList;
    this.educationLevel = this.competenciesService.educationLevelList;
    this.educationDiscipline  = this.competenciesService.educationDesciplineList;
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
}