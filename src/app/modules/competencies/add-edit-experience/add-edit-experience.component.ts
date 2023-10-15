import { Component } from '@angular/core';
import { Experience } from '../models/experience';

@Component({
  selector: 'app-add-edit-experience',
  templateUrl: './add-edit-experience.component.html',
  styleUrls: ['./add-edit-experience.component.scss']
})
export class AddEditExperienceComponent {
  public completed: boolean = true;
  public sidenavOpen: boolean = false;
  title = 'angular';
  experiences: Experience[] = [];
  activeIndex: number = -1;
  isEdit: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  OpenSidenav() {
    this.experiences.push(new Experience());
    this.activeIndex = this.experiences.length - 1;
    this.sidenavOpen = true;
    document.body.style.overflow = 'hidden';
    this.isEdit = false;
  }

  closeAndNew() {
    this.experiences.push(new Experience());
    this.activeIndex = this.experiences.length - 1;
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
    this.experiences.splice(index, 1);
    this.isEdit = false;
    this.activeIndex = -1;
  }

  Discard() {
    if (!this.isEdit) {
      this.experiences.splice(this.experiences.length-1, 1);
    }
    this.sidenavOpen = false;
    document.body.style.overflow = 'auto';
    this.isEdit = false;
    this.activeIndex = -1;
  }
}
