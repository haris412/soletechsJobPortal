import { Component } from '@angular/core';
import { Education } from '../models/education';

@Component({
  selector: 'app-add-edit-education',
  templateUrl: './add-edit-education.component.html',
  styleUrls: ['./add-edit-education.component.scss']
})
export class AddEditEducationComponent {
  public completed: boolean = true;
  public sidenavOpen: boolean = false;
  public isFile: boolean = false;
  fileList:any[]=[]
  title = 'angular';
  educations: Education[] = [];
  activeIndex: number = -1;
  isEdit: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  OpenSidenav() {
    this.educations.push(new Education());
    this.activeIndex = this.educations.length - 1;
    this.sidenavOpen = true;
    document.body.style.overflow = 'hidden';
    this.isEdit = false;
  }

  closeAndNew() {
    this.educations.push(new Education());
    this.activeIndex = this.educations.length - 1;
    this.sidenavOpen = false;
    document.body.style.overflow = 'auto';
    this.isEdit = false;
    this.sidenavOpen = true;
    document.body.style.overflow = 'hidden';
  }

  CloseSidenav() {
    this.sidenavOpen = false;
    document.body.style.overflow = 'auto';
    this.isEdit = false;
    this.activeIndex = -1;
  }

  edit(index: number) {
    this.isEdit = true;
    this.activeIndex = index;
    this.sidenavOpen = true;
    document.body.style.overflow = 'hidden';
  }

  delete(index: number) {
    this.educations.splice(index, 1);
    this.isEdit = false;
    this.activeIndex = -1;
  }

  Discard() {
    if (!this.isEdit) {
      this.educations.splice(this.educations.length-1, 1);
    }
    this.sidenavOpen = false;
    document.body.style.overflow = 'auto';
    this.isEdit = false;
    this.activeIndex = -1;
  }
}
