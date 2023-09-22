import { Component } from '@angular/core';
import {DeleteModalComponentService} from '../../../shared/delete-modal/delete-modal.service'

@Component({
  selector: 'app-add-edit-skills',
  templateUrl: './add-edit-skills.component.html',
  styleUrls: ['./add-edit-skills.component.scss']
})
export class AddEditSkillsComponent {
  public completed: boolean = true;
  public sidenavOpen: boolean = false;
  title = 'angular';

  constructor(
    private deleteModal: DeleteModalComponentService
  ) { }

  ngOnInit(): void {
  }

  OpenSidenav() {
    this.sidenavOpen = true;
    document.body.style.overflow = 'hidden';
  }

  CloseSidenav() {
    this.sidenavOpen = false;
    document.body.style.overflow = 'auto';
  }

  DeleteModal() {
    const dialogRef = this.deleteModal.openDialog('Are you sure you want to proceed?');
  }
}
