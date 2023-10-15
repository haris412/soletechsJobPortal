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
  file_store!: FileList;
  fileList:any[]=[];
  file:any;
  skillList: Skills[] = [];
  activeIndex: number = -1;
  isEdit: boolean = false;
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
    this.skillList.push(new Skills());
    this.activeIndex = this.skillList.length - 1;
    this.sidenavOpen = true;
    document.body.style.overflow = 'hidden';
    this.isEdit = false;
  }

  closeAndNew() {
    this.skillList.push(new Skills());
    this.activeIndex = this.skillList.length - 1;
    this.sidenavOpen = true;
    document.body.style.overflow = 'hidden';
    this.isEdit = false;
  }

  EditSkill(index: number) {
    this.isEdit = true;
    this.activeIndex = index;
    this.sidenavOpen = true;
    document.body.style.overflow = 'hidden';
  }

  CloseSidenav() {
    this.sidenavOpen = false;
    document.body.style.overflow = 'auto';
    this.isEdit = false;
    this.activeIndex = -1;
  }

  DeleteModal(index: number) {
    this.skillList.splice(index, 1);
    this.isEdit = false;
    this.activeIndex = -1;
  }

  handleFileInputChange(event: any) {
    let files = event?.target.files[0];
    this.file = event?.target.files[0];
    this.file_store = event;
    if (files) {
    } else {

    }
  }
  
  Discard() {
    if (!this.isEdit) {
      this.skillList.splice(this.skillList.length-1, 1);
    }
    this.sidenavOpen = false;
    document.body.style.overflow = 'auto';
    this.isEdit = false;
    this.activeIndex = -1;
  }

}
