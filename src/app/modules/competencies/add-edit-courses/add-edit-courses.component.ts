import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Course } from 'src/app/models/courses.model';

@Component({
  selector: 'app-add-edit-courses',
  templateUrl: './add-edit-courses.component.html',
  styleUrls: ['./add-edit-courses.component.scss']
})
export class AddEditCoursesComponent {
  @Input() selectedCourse:Course = new Object() as Course;
  @Output() closeSideNav: EventEmitter<any> = new EventEmitter();
  @Output() courseData: EventEmitter<Course> = new EventEmitter();
  CourseForm: UntypedFormGroup;
  private _formBuilder = inject(UntypedFormBuilder);
  Course!: Course;
  fileList:any[]=[];
  file_store!: FileList;
  file:any;
  constructor(){
    this.CourseForm = this._formBuilder.group({
      id: [''],
      courses: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate:['', [Validators.required]],
      location:['', [Validators.required]],
      attachment:['']
    });
    
  }
  ngOnInIt(){
    if(this.selectedCourse.courses !== ''){
      this.CourseForm.patchValue({
        ...this.selectedCourse
      });
    }
   }
    CloseSideNav: () => void = () => {
      this.closeSideNav.emit(true);
    }
  
    SaveCourse: () => void = () => {
      if (this.CourseForm.valid) {
        this.selectedCourse = this.CourseForm.getRawValue();
        this.courseData.emit(this.selectedCourse);
      } else {
        this.CourseForm.markAllAsTouched();
      }
    }
    Discard: () => void = () => {
      this.CourseForm.reset();
      this.fileList = [];
    }
    onFileUpload(files: any) {
      this.fileList = files.target.files;
    }
  
    DeleteFile: (selectedFile:File) => void = () => {
      //this.fileList = this.fileList.filter((file:any)=> file.name !== selectedFile.name);
      this.fileList = [];
    }
}
