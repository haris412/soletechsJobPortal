import { Component } from '@angular/core';
import { Education } from '../models/education';
import { ToastrService } from 'ngx-toastr';
import { DeleteModalComponentService } from 'src/app/shared/delete-modal/delete-modal.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent {
  public completed: boolean = true;
  public sidenavOpen: boolean = false;
  public isFile: boolean = false;
  fileList:any[]=[]
  title = 'angular';
  educations: Education[] = [];
  selectedEducation!:Education;
  activeIndex: number = -1;
  isEdit: boolean = false;
  constructor(private toastrService: ToastrService,
    private deleteModal: DeleteModalComponentService){}

  OpenSidenav() {
    this.sidenavOpen = true;
    document.body.style.overflow = 'hidden';
  }

  CloseSidenav() {
    this.sidenavOpen = false;
    document.body.style.overflow = 'auto';
  }

  EditEducation(education:Education){
    this.selectedEducation = education;
    this.OpenSidenav();
  }

  EducationAdded(positionOfTrust:Education){
    this.toastrService.success('Education Added Successfully');
    this.educations.push(positionOfTrust);
    this.CloseSidenav();
  }

  Delete(selectededucation:Education) {
    const data = `Are you sure you want to do delete this education?`;
    const dialogRef = this.deleteModal.openDialog(data);
    dialogRef.afterClosed().subscribe((dialogResult: any) => {
      if (dialogResult) {
        this.educations = this.educations.filter((education:Education) => education.education !== selectededucation.education);
      }
    });
  }
}
