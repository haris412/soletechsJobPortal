import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Course } from 'src/app/models/courses.model';
import { DeleteModalComponentService } from 'src/app/shared/delete-modal/delete-modal.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
  public completed: boolean = true;
  public sidenavOpen: boolean = false;
  public courses: Course[]=[];
  selectedCourse!:Course;
  constructor(private toastrService: ToastrService,
    private deleteModal: DeleteModalComponentService) { }

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
  EditCourse(certificate:Course){
    this.selectedCourse = certificate;
    this.OpenSidenav();
  }

  CourseAdded(certificate:Course){
    this.toastrService.success('course Added Successfully');
    this.courses.push(certificate);
    this.CloseSidenav();
  }

  Delete(selectedcourse:Course) {
    const data = `Are you sure you want to do delete this course?`;
    const dialogRef = this.deleteModal.openDialog(data);
    dialogRef.afterClosed().subscribe((dialogResult: any) => {
      if (dialogResult) {
        this.courses = this.courses.filter((course:Course) => course.course !== selectedcourse.course);
      }
    });
  }
}
