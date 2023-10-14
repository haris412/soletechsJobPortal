import { Component, inject } from '@angular/core';
import { DeleteModalComponentService } from '../../../shared/delete-modal/delete-modal.service'
import { FormBuilder, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Skills } from 'src/app/models/skills.model';

@Component({
  selector: 'app-add-edit-skills',
  templateUrl: './add-edit-skills.component.html',
  styleUrls: ['./add-edit-skills.component.scss']
})
export class AddEditSkillsComponent {
  public completed: boolean = true;
  public sidenavOpen: boolean = false;
  public isFile: boolean = false;
  title = 'angular';
  private _formBuilder = inject(UntypedFormBuilder);
  form: UntypedFormGroup;
  skillList: Skills[] = [];
  file_store!: FileList;
  fileList:any[]=[];
  file:any;
  constructor(
    private deleteModal: DeleteModalComponentService,
  ) {
    this.form = this._formBuilder.group({
      skillId: [''],
      level: ['', [Validators.required]],
      levelDate: ['', [Validators.required]],
      yearOfExperience: ['', [Validators.required]],
      attachment: [''],
    });
  }

  ngOnInit(): void {
  }

  OpenSidenav() {
    this.sidenavOpen = true;
    document.body.style.overflow = 'hidden';
  }

  EditSkill(skill: Skills) {
    this.form.patchValue({
      ...skill
    })
    this.sidenavOpen = true;
    document.body.style.overflow = 'hidden';
  }

  CloseSidenav() {
    this.sidenavOpen = false;
    document.body.style.overflow = 'auto';
  }

  DeleteModal(skillId: string) {
    const dialogRef = this.deleteModal.openDialog('Are you sure you want to proceed?');
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.skillList = this.skillList.filter((skill: Skills) => skill.skillId !== skillId);
      }
    });
  }
  AddSkill() {
    if (this.form.valid) {
      let skills: Skills = {
         ...this.form.getRawValue(),
         attachment :this.file
      };
      this.skillList.push(skills);
      this.CloseSidenav();
    } else {

    }
  }
  handleFileInputChange(event: any) {
    let files = event?.target.files[0];
    this.file = event?.target.files[0];
    this.file_store = event;
    if (files) {
    } else {

    }
  }
}
