import { Component, OnInit, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppLookUpService } from 'src/app/app-services/app-look-up.service';
import { Skills } from 'src/app/models/skills.model';
import { DeleteModalComponentService } from 'src/app/shared/delete-modal/delete-modal.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { TranslationAlignmentService } from 'src/app/app-services/translation-alignment.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit{
  public completed: boolean = true;
  public sidenavOpen: boolean = false;
  public isFile: boolean = false;
  skillList: Skills[] = [];
  selectedSkill!:Skills;
  personRecId!:number;

  constructor(
    private lookUpService:AppLookUpService,
    private toastrService: ToastrService,
    private deleteModal: DeleteModalComponentService,
    public sharedService: SharedService,
    public translationService: TranslationAlignmentService
  ) {
    this.translationService.languageChange.subscribe(x => {
      this.translationService.isTranslate = x;
      this.SkillListLanguageChanges();
    });
    this.personRecId = Number(localStorage.getItem('applicantPersonRecid'));
  }

  ngOnInit(): void {
    this.GetSkillsList();
  }

  AddSkill(){
    this.selectedSkill = new Object() as Skills;
    this.OpenSidenav();
  }

  async GetSkillsList(){
    let skillsResponse = await this.lookUpService.GetSkillsList(this.personRecId);
    if(skillsResponse?.parmApplicantSkillsList){
      this.skillList = skillsResponse.parmApplicantSkillsList;
      this.sharedService.skillsListCopy = this.sharedService.DeepCopyObject(skillsResponse.parmApplicantSkillsList);
    }
    this.SkillListLanguageChanges();
  }

  OpenSidenav() {
    this.sidenavOpen = true;
    document.body.style.overflow = 'hidden';
  }

  EditSkill(skill: Skills) {
    this.selectedSkill = skill;
    this.OpenSidenav();
  }
  CloseSidenav() {
    this.sidenavOpen = false;
    document.body.style.overflow = 'auto';
  }
  async SkillAdded(skill:Skills){
    let skillData: Skills = {
      ...skill,
      RatingLevelId: Number(skill.RatingLevelId),
      RecId: skill?.RecId ? skill?.RecId :0,
      AttachmentWeb:skill.Attachment ? 1: 0,
      applicantPersonRecId: Number(localStorage.getItem('applicantPersonRecid'))
    }
    let response;
    var isEdit = false;
    if (skill?.RecId > 0) {
      skillData = skill;
      response = await this.lookUpService.EditSkill(skillData);
      isEdit = true;
    } else {
      response = await this.lookUpService.CreateSkill(skillData);
    }
    if (response?.Status) {
      this.toastrService.success(response?.Message);
      this.GetSkillsList();
      this.CloseSidenav();
    } else {
      this.toastrService.error(response?.Message);
    }
    
  }
    DeleteSkill(selectedSkill:Skills) {
    const data = `Are you sure you want to do this skill?`;
    const dialogRef = this.deleteModal.openDialog(data);
     dialogRef.afterClosed().subscribe(async (dialogResult: any) => {
      if (dialogResult) {
        let applicantPersonRecId = Number(localStorage.getItem('applicantPersonRecid'));
        let response:any = await this.lookUpService.DeleteSkills(selectedSkill?.RecId ,applicantPersonRecId);
        if(response?.Status){
          this.toastrService.success(response?.Message);
          this.GetSkillsList();
        }else{
          this.toastrService.error(response?.Message);
        }
      }
    });
  }
  SkillListLanguageChanges() {
    if (this.skillList?.length > 0) {
      if (this.translationService.isTranslate) {
        for(let i = 0; i < this.skillList?.length; i++) {
          this.skillList[i].SkillID = this.sharedService.skillsListCopy[i]?.descriptionSkillAr ? this.sharedService.skillsListCopy[i]?.descriptionSkillAr : this.sharedService.skillsListCopy[i]?.SkillID;
        }
      } else {
        this.skillList = this.sharedService.DeepCopyObject(this.sharedService.skillsListCopy);
      }     
    }
  }
}
