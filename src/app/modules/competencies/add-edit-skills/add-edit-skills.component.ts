import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { DeleteModalComponentService } from '../../../shared/delete-modal/delete-modal.service'
import { FormBuilder, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Skills } from 'src/app/models/skills.model';
import { DeleteModalComponent } from 'src/app/shared/delete-modal/delete-modal.component';
import { CompetenciesCommonService } from '../services/competencies-common.service';

@Component({
  selector: 'app-add-edit-skills',
  templateUrl: './add-edit-skills.component.html',
  styleUrls: ['./add-edit-skills.component.scss']
})
export class AddEditSkillsComponent {
  @Input() selectedSkill:Skills = new Object() as Skills;
  @Output() closeSideNav: EventEmitter<any> = new EventEmitter();
  @Output() skillData: EventEmitter<Skills> = new EventEmitter();
  skillForm: UntypedFormGroup;
  private _formBuilder = inject(UntypedFormBuilder);
  skill!: Skills;
  fileList:any[]=[];
  file_store!: FileList;
  file:any;
  constructor(private competenciesService:CompetenciesCommonService){
    this.skillForm = this._formBuilder.group({
      skillId: [''],
      level: ['', [Validators.required]],
      levelDate: ['', [Validators.required]],
      yearOfExperience:['', [Validators.required]],
      attachment:['']
    });
    
  }
  ngOnInIt(){
    if(this.selectedSkill.skillId !== ''){
      this.skillForm.patchValue({
        ...this.selectedSkill
      });
    }
   }
    CloseSideNav: () => void = () => {
      this.closeSideNav.emit(true);
    }
  
    SaveSkill: () => void = () => {
      if (this.skillForm.valid) {
        this.selectedSkill = this.skillForm.getRawValue();
        this.skillData.emit(this.selectedSkill);
      } else {
        this.skillForm.markAllAsTouched();
      }
    }
    Discard: () => void = () => {
      this.skillForm.reset();
      this.fileList = [];
    }
    onFileUpload(files: any) {
      this.fileList.push(files.target.files);
    }
  
    DeleteFile: (selectedFile:File) => void = () => {
      //this.fileList = this.fileList.filter((file:any)=> file.name !== selectedFile.name);
      this.fileList = [];
    }
}



