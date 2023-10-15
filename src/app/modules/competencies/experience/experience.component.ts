import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Skills } from 'src/app/models/skills.model';
import { DeleteModalComponentService } from 'src/app/shared/delete-modal/delete-modal.service';
import { Experience } from '../models/experience';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent {
  public completed: boolean = true;
  public sidenavOpen: boolean = false;
  experienceList: Experience[] = [];
  selectedExperience!:Experience;
  constructor(
    private toastrService: ToastrService,
    private deleteModal: DeleteModalComponentService,
  ) {}
  EditExperience(experience: Experience) {
    this.selectedExperience = experience;
    this.OpenSidenav();
  }
  OpenSidenav() {
    this.sidenavOpen = true;
    document.body.style.overflow = 'hidden';
  }
  CloseSidenav() {
    this.sidenavOpen = false;
    document.body.style.overflow = 'auto';
  }
  ExperienceAdded(experience:Experience){
    this.toastrService.success('experience Added Successfully');
    this.experienceList.push(experience);
    this.CloseSidenav();
  }

  DeleteExperience(selectedExperience:Experience) {
    const data = `Are you sure you want to do this experience?`;
    const dialogRef = this.deleteModal.openDialog(data);
    dialogRef.afterClosed().subscribe((dialogResult: any) => {
      if (dialogResult) {
        this.experienceList = this.experienceList.filter((experience:Experience) => experience.id !== selectedExperience.id);
      }
    });
  }
}
