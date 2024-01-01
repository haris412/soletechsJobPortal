import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Skills } from 'src/app/models/skills.model';
import { CompetenciesCommonService } from '../services/competencies-common.service';
import { TranslationAlignmentService } from 'src/app/app-services/translation-alignment.service';

@Component({
  selector: 'app-add-edit-skills',
  templateUrl: './add-edit-skills.component.html',
  styleUrls: ['./add-edit-skills.component.scss']
})
export class AddEditSkillsComponent implements OnInit {
  @Input() selectedSkill:Skills = new Object() as Skills;
  @Output() closeSideNav: EventEmitter<any> = new EventEmitter();
  @Output() skillData: EventEmitter<Skills> = new EventEmitter();
  skillForm: UntypedFormGroup;
  private _formBuilder = inject(UntypedFormBuilder);
  skill!: Skills;
  fileList:any[]=[];
  file_store!: FileList;
  file:any;
  skillList:any[] = [];
  skillLevel:any[] = [];
  public isTranslate: boolean = this.translationService.isTranslate;
  get f() { return this.skillForm.controls; }
  constructor(
    private competenciesService:CompetenciesCommonService,
    public translationService: TranslationAlignmentService){
    this.skillForm = this._formBuilder.group({
      SkillID: ['',[Validators.required]],
      RatingLevelType: ['', [Validators.required]],
      RatingLevelDate: ['', [Validators.required]],
      Experience:['', [Validators.required]],
      attachment:['']
    });
    this.translationService.languageChange.subscribe( x=> {
      this.isTranslate  = x;
    });
  }
  ngOnInit(){
    this.skillList = this.competenciesService.skillsList;
    this.skillLevel = this.competenciesService.skillLevelList;
    if(this.selectedSkill?.SkillID !== ''){
      this.skillForm.patchValue({
        ...this.selectedSkill,
        RatingLevelType:this.selectedSkill?.RatingLevelType?.toString()
      });
    }
   }
    CloseSideNav: () => void = () => {
      this.closeSideNav.emit(true);
    }
  
    SaveSkill: () => void = () => {
      if (this.skillForm.valid) {
        this.selectedSkill = { ...this.selectedSkill, ...this.skillForm.getRawValue()};
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



