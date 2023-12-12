import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppLookUpService } from 'src/app/app-services/app-look-up.service';
import { Course } from 'src/app/models/courses.model';
import { DeleteModalComponentService } from 'src/app/shared/delete-modal/delete-modal.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit{
  public completed: boolean = true;
  public sidenavOpen: boolean = false;
  public courses: Course[]=[];
  selectedCourse!:Course;
  personRecId!:number;

  constructor(private toastrService: ToastrService,
              private lookUpService:AppLookUpService,
              private deleteModal: DeleteModalComponentService) { 
            this.personRecId = Number(localStorage.getItem('applicantPersonRecid'));
          }

  ngOnInit(): void {
    this.GetCourses();
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

  async GetCourses(){
    let experienceResponse = await this.lookUpService.GetCourseList(this.personRecId);
    if(experienceResponse?.parmApplicantCourseList?.length > 0){
      this.courses = experienceResponse.parmApplicantCourseList;
    }
  }

  async CourseAdded(course:Course){
    let courseData: Course = {
      ...course,
      RecId: course?.RecId ? course?.RecId : 0,
      applicantPersonRecId: Number(localStorage.getItem('applicantPersonRecid'))
    }
    let response;
    if (course?.RecId > 0) {
      courseData = course;
      response = await this.lookUpService.EditCourse(courseData);
    } else {
      response = await this.lookUpService.CreateCourse(courseData);
    }
    if (response?.Status) {
      this.toastrService.success(response?.Message);
      this.GetCourses();
      this.CloseSidenav();
    }else {
      this.toastrService.error(response?.Message);
    }
  }

  Delete(selectedcourse:Course) {
    const data = `Are you sure you want to do delete this course?`;
    const dialogRef = this.deleteModal.openDialog(data);
    dialogRef.afterClosed().subscribe(async (dialogResult: any) => {
      if (dialogResult) {
        let applicantPersonRecId = Number(localStorage.getItem('applicantPersonRecid'));
        let response: any = await this.lookUpService.DeleteCourse(selectedcourse?.RecId, applicantPersonRecId);
        if (response?.Status) {
          this.toastrService.success(response?.Message);
          this.GetCourses();
        }else{
          this.toastrService.error(response?.Message);
        }
      }
    });
  }
}
