import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Experience } from '../models/experience';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-edit-experience',
  templateUrl: './add-edit-experience.component.html',
  styleUrls: ['./add-edit-experience.component.scss']
})
export class AddEditExperienceComponent {
  @Input() selectedExperience: Experience = new Object() as Experience;
  @Output() closeSideNav: EventEmitter<any> = new EventEmitter();
  @Output() experienceData: EventEmitter<Experience> = new EventEmitter();
  experienceForm: UntypedFormGroup;
  private _formBuilder = inject(UntypedFormBuilder);
  skill!: Experience;
  fileList: any[] = [];
  file_store!: FileList;
  file: any;
  constructor() {
    this.experienceForm = this._formBuilder.group({
      id: [''],
      employer: ['', [Validators.required]],
      position: ['', [Validators.required]],
      internetAddress: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      notes: [''],
      attachment: ['']
    });

  }
  ngOnInIt() {
    this.experienceForm.reset();
    if (this.selectedExperience.id !== '') {
      this.experienceForm.patchValue({
        ...this.selectedExperience
      });
    }
  }
  CloseSideNav: () => void = () => {
    this.closeSideNav.emit(true);
  }

  SaveExperience: () => void = () => {
    if (this.experienceForm.valid) {
      this.selectedExperience = this.experienceForm.getRawValue();
      this.experienceData.emit(this.selectedExperience);
    } else {
      this.experienceForm.markAllAsTouched();
    }
  }
  Discard: () => void = () => {
    this.experienceForm.reset();
    this.fileList = [];
  }
  onFileUpload(files: any) {
    this.fileList = files.target.files;
  }
  DeleteFile: (selectedFile: File) => void = () => {
    this.fileList = [];
  }
}
