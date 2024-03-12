import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Skills } from 'src/app/models/skills.model';
import { CompetenciesCommonService } from '../services/competencies-common.service';
import { TranslationAlignmentService } from 'src/app/app-services/translation-alignment.service';
import { AppLookUpService } from 'src/app/app-services/app-look-up.service';
import { Observable, map, startWith } from 'rxjs';

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
  skillLevelEnglish:any[] = [];
  skillLevelArabic:any[] = [];

  public isTranslate: boolean = this.translationService.isTranslate;
  fileCvData: any;
  cvData: any
  fileFromAttachments = '';
  attachBase64: any = '';
  get f() { return this.skillForm.controls; }
  skillsData!: Observable<any[]>;
  skillsCtrl = new FormControl('');
  selectedSkillPlaceHolder:string = ''
  constructor(
    private competenciesService:CompetenciesCommonService,
    public translationService: TranslationAlignmentService,
    public lookupService: AppLookUpService){
    this.skillForm = this._formBuilder.group({
      SkillID: ['',[Validators.required]],
      RatingLevelId: ['', [Validators.required]],
      RatingLevelDate: ['', [Validators.required]],
      Experience:['', [Validators.required]],
      Attachment:[''],
			fileName: ['']
    });
    this.translationService.languageChange.subscribe( x=> {
      this.isTranslate  = x;
    });
  }
  ngOnInit(){
    if(this.selectedSkill?.SkillID !== ''){
      this.GetRatingLevel(this.selectedSkill.SkillID);
      this.skillForm.patchValue({
        ...this.selectedSkill,
        RatingLevelId:this.selectedSkill?.RatingLevelId?.toString()
      });
      this.SetSkillValue();
    }
    this.GetFilesFromAttachment(this.selectedSkill?.Attachment);
    this.skillsData = this.skillsCtrl.valueChanges.pipe(
      startWith(''),
      map(value => this.__filterSkills(value || '')),
    );
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
      if (files.target.files.length > 0) {
        this.fileCvData = files.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(this.fileCvData);
        reader.onload = () => {
          this.cvData = reader.result;
          this.skillForm.controls.Attachment.setValue(this.cvData.substring(this.cvData.indexOf('base64,') + 7, this.cvData.length));
          this.skillForm.controls.fileName.setValue(this.fileCvData.name);
        };
      }
      this.fileList.push(files.target.files);
    }
  
    DeleteFile(index: number) {
      this.fileList.splice(index, 1);
    }

    async GetFilesFromAttachment(attachment: string) {
      if (attachment && attachment.includes('soletechsattachmentcontainer')) {
        /// call to get data from Azure
        this.attachBase64 = await this.lookupService.GetAttachmentFromAzure(attachment);
        this.fileFromAttachments = attachment;
      }
    }

    DownloadFile() {
      this.showPdf();
    }
    private __filterSkills(value: string): string[] {
      const filterValue = value?.toLowerCase();
      return this.translationService.isTranslate ? this.competenciesService.skillsArabicList?.filter(skill => skill?.name?.toLowerCase()?.includes(filterValue)) : this.competenciesService.skillsList?.filter(skill => skill?.name?.toLowerCase()?.includes(filterValue));
    }
    async OnSkillsChange(event:any){
      let filteredCountry = this.translationService.isTranslate ? this.competenciesService.skillsArabicList?.find(skill => skill?.value === event?.source.value) : this.competenciesService.skillsList?.find(skill => skill?.value === event?.source.value);
      this.skillsCtrl.setValue(filteredCountry.name);
      this.selectedSkillPlaceHolder = filteredCountry.name;
      this.skillForm.controls.SkillID.setValue(filteredCountry.value);
      let res = await this.lookupService.GetRatingLevelLookup(event?.source.value);
      if (res) {
        this.skillLevel = [];
        this.skillLevelEnglish = [];
        this.skillLevelArabic = [];
        res?.parmList?.forEach((projects: any) => {
          let data = new Object() as any;
          data.name = projects.Description;
          data.value = projects.Id;
          this.skillLevelEnglish.push(data);
        });
        res?.parmList?.forEach((projects: any) => {
          let data = new Object() as any;
          data.name = projects.OtherLine ? projects.OtherLine : projects.Description;
          data.value = projects.Id;
          this.skillLevelArabic.push(data);
        });
        if (this.isTranslate) {
          this.skillLevel = this.skillLevelArabic;
        } else {
          this.skillLevel = this.skillLevelEnglish;
        }
      }
    }
  
    async GetRatingLevel(skillId:string){
      let res = await this.lookupService.GetRatingLevelLookup(skillId);
      if (res) {
        this.skillLevel = [];
        this.skillLevelEnglish = [];
        this.skillLevelArabic = [];
        res?.parmList?.forEach((projects: any) => {
          let data = new Object() as any;
          data.name = projects.Description;
          data.value = projects.Id;
          this.skillLevelEnglish.push(data);
        });
        res?.parmList?.forEach((projects: any) => {
          let data = new Object() as any;
          data.name = projects.OtherLine ? projects.OtherLine : projects.Description;
          data.value = projects.Id;
          this.skillLevelArabic.push(data);
        });
        if (this.isTranslate) {
          this.skillLevel = this.skillLevelArabic;
        } else {
          this.skillLevel = this.skillLevelEnglish;
        }
      }
    }
    SetSkillValue(){
      let filteredSkill = this.translationService.isTranslate ? this.competenciesService.skillsArabicList?.find(skill => skill?.value === this.selectedSkill.SkillID) : this.competenciesService.skillsList?.find(skill => skill?.value === this.selectedSkill.SkillID);
      if(filteredSkill){
       this.skillsCtrl.setValue(filteredSkill.name);
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
}



