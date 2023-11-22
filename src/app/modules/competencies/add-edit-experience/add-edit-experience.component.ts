import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { Experience } from '../models/experience';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { CompetenciesCommonService } from '../services/competencies-common.service';
import { professionalExperience } from 'src/app/models/professional-experience.model';

@Component({
  selector: 'app-add-edit-experience',
  templateUrl: './add-edit-experience.component.html',
  styleUrls: ['./add-edit-experience.component.scss']
})
export class AddEditExperienceComponent implements OnInit {
  @Input() selectedExperience: professionalExperience = new Object() as professionalExperience;
  @Output() closeSideNav: EventEmitter<any> = new EventEmitter();
  @Output() experienceData: EventEmitter<professionalExperience> = new EventEmitter();
  experienceForm: UntypedFormGroup;
  private _formBuilder = inject(UntypedFormBuilder);
  skill!: Experience;
  fileList: any[] = [];
  file_store!: FileList;
  file: any;
  constructor(private competenciesService: CompetenciesCommonService) {
    this.experienceForm = this._formBuilder.group({
      id: [''],
      employerName: ['', [Validators.required]],
      qualificationPosition: ['', [Validators.required]],
      internetAddress: ['', [Validators.required]],
      phone:['',[Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      notes: [''],
      attachment: ['']
    });

  }
  ngOnInit() {
    this.experienceForm.reset();
    if (this.selectedExperience?.employerName !== '') {
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
    this.fileList.push(files.target.files[0]);
  }
  DeleteFile: (selectedFile: File) => void = () => {
    this.fileList = [];
  }
}
