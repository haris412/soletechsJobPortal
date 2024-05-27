import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Course } from 'src/app/models/courses.model';
import { CompetenciesCommonService } from '../services/competencies-common.service';
import { TranslationAlignmentService } from 'src/app/app-services/translation-alignment.service';
import { AppLookUpService } from 'src/app/app-services/app-look-up.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit-courses',
  templateUrl: './add-edit-courses.component.html',
  styleUrls: ['./add-edit-courses.component.scss']
})
export class AddEditCoursesComponent  implements OnInit{
  @Input() selectedCourse:Course = new Object() as Course;
  @Output() closeSideNav: EventEmitter<any> = new EventEmitter();
  @Output() courseData: EventEmitter<Course> = new EventEmitter();
  CourseForm: UntypedFormGroup;
  private _formBuilder = inject(UntypedFormBuilder);
  Course!: Course;
  fileList:any[]=[];
  file_store!: FileList;
  file:any;
  fileCvData: any;
  cvData: any
  fileFromAttachments = '';
  attachBase64: any = '';
  public isTranslate: boolean = this.translationService.isTranslate;
  get f() { return this.CourseForm.controls; }
  constructor(
    public translationService: TranslationAlignmentService,
    public lookupService: AppLookUpService,
    private toastrService: ToastrService
  ){
    this.CourseForm = this._formBuilder.group({
      id: [''],
      course: ['', [Validators.required]],
      StartDate: ['', [Validators.required]],
      EndDate:['', [Validators.required]],
      Location:['', [Validators.required]],
      NoOfDay:[],
      HourType:[''],
      NumberOfHours:[],
      attachment:[''],
			fileName: ['']
    });
    this.translationService.languageChange.subscribe( x=> {
      this.isTranslate  = x;
    });
  }
  ngOnInit(){
    if(this.selectedCourse?.course !== ''){
      this.CourseForm.patchValue({
        ...this.selectedCourse
      });
    }
    this.GetFilesFromAttachment(this.selectedCourse?.Attachment);
   }
    CloseSideNav: () => void = () => {
      this.closeSideNav.emit(true);
    }
  
    SaveCourse: () => void = () => {
      if (this.CourseForm.valid) {
        let date2: any;
        if (
          this.CourseForm.controls.StartDate.value != undefined &&
          this.CourseForm.controls.StartDate.value != null
        ) {
          const date1 = new Date(this.CourseForm.controls.StartDate.value);
          if (this.selectedCourse.StartDate) {
            date2 = new Date(this.selectedCourse.StartDate);
          } else {
            date2 = new Date();
          }
          // Parse the birthDate string into a JavaScript Date object
          const originalDate = new Date(
            this.CourseForm.controls.StartDate.value
          );
          // Check if originalDate is a valid Date object
          if (
            !isNaN(originalDate.getTime()) &&
            date1?.toISOString() !== date2?.toISOString()
          ) {
            // Add one day to the date
            originalDate.setDate(originalDate.getDate() + 1);
            let startDateControl = this.CourseForm.controls.StartDate as any;
            startDateControl.setValue(originalDate.toISOString());
          }
        }
        if (
          this.CourseForm.controls.EndDate.value !== undefined &&
          this.CourseForm.controls.EndDate.value !== null
        ) {
          let endDate2: any;
          const endDate1 = new Date(this.CourseForm.controls.EndDate.value);
          if (this.selectedCourse.EndDate) {
            endDate2 = new Date(this.selectedCourse.EndDate );
          } else {
            endDate2 = new Date();
          }
          // Parse the birthDate string into a JavaScript Date object
          const originalDate = new Date(
            this.CourseForm.controls.EndDate.value
          );
          // Check if originalDate is a valid Date object
          if (
            !isNaN(originalDate.getTime()) &&
            endDate1?.toISOString() !== endDate2?.toISOString()
          ) {
            // Add one day to the date
            originalDate.setDate(originalDate.getDate() + 1);
            let endDateControl = this.CourseForm.controls.EndDate as any;
            endDateControl.setValue(originalDate.toISOString());
          }
        }
        this.selectedCourse = { ...this.selectedCourse, ...this.CourseForm.getRawValue()};
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
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ];
      if (files?.target?.files?.length > 0) {
        this.fileCvData = files.target.files[0];
        if (this.fileCvData && allowedTypes.includes(this.fileCvData?.type)) {
          const reader = new FileReader();
          reader.readAsDataURL(this.fileCvData);
          reader.onload = () => {
            this.cvData = reader.result;
            this.CourseForm.controls.attachment.setValue(
              this.cvData.substring(
                this.cvData.indexOf('base64,') + 7,
                this.cvData.length
              )
            );
            this.CourseForm.controls.fileName.setValue(this.fileCvData.name);
          };
          this.fileList.push(files.target.files[0]);
        } else {
          this.toastrService.error('Only PDF and Word files are allowed');
        }
      }
    }
  
    DeleteFile: (selectedFile:File) => void = () => {
      //this.fileList = this.fileList.filter((file:any)=> file.name !== selectedFile.name);
      this.fileList = [];
    }

    async GetFilesFromAttachment(attachment: string) {
      if (attachment && attachment.includes('soletechsattachmentcontainer')) {
        this.attachBase64 = await this.lookupService.GetAttachmentFromAzure(attachment);
        this.fileFromAttachments = attachment;
      }
    }

    DownloadFile() {
      this.showPdf();
    }

    showPdf() {
      const linkSource =
        'data:application/octet-stream;base64,' + this.attachBase64?.value;
      const downloadLink = document.createElement('a');
      const fileName = this.fileFromAttachments.substring(this.fileFromAttachments.lastIndexOf('/') + 1, this.fileFromAttachments.length);
  
      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
    }
}
