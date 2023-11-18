import { Component, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Skills } from 'src/app/models/skills.model';
import { DeleteModalComponentService } from 'src/app/shared/delete-modal/delete-modal.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent {
  public completed: boolean = true;
  public sidenavOpen: boolean = false;
  public isFile: boolean = false;
  skillList: Skills[] = [];
  selectedSkill!:Skills;
  constructor(
    private toastrService: ToastrService,
    private deleteModal: DeleteModalComponentService,
  ) {}

  ngOnInit(): void {
  }

  OpenSidenav() {
    this.selectedSkill = new Object() as Skills;
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
  SkillAdded(skill:Skills){
    this.toastrService.success('skill Added Successfully');
    this.skillList.push(skill);
    this.CloseSidenav();
  }
  DeleteSkill(selectedSkill:Skills) {
    const data = `Are you sure you want to do this skill?`;
    const dialogRef = this.deleteModal.openDialog(data);
    dialogRef.afterClosed().subscribe((dialogResult: any) => {
      if (dialogResult) {
        this.skillList = this.skillList.filter((skill:Skills) => skill.SkillID !== selectedSkill.SkillID);
      }
    });
  }
}
