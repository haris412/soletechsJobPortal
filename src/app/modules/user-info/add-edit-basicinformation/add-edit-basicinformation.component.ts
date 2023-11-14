import { Component, inject } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { UserInfoService } from '../user-info.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-edit-basicinformation',
  templateUrl: './add-edit-basicinformation.component.html',
  styleUrls: ['./add-edit-basicinformation.component.scss']
})
export class AddEditBasicinformationComponent {
  public completed: boolean = true;
  public sidenavOpen: boolean = false;
  title = 'angular';
  public Editor = ClassicEditor;
  private _formBuilder = inject(UntypedFormBuilder);
	applicantForm: UntypedFormGroup;

  constructor(public userInfoService: UserInfoService) {
    this.applicantForm = this._formBuilder.group({
			currentJobTitle: ['',[Validators.required]],
			firstName:['', [Validators.required]],
      lastName:['', [Validators.required]],
      middleName:['', [Validators.required]],
      maritalStatus:['', [Validators.required]],
      birthDate:[''],
      highestDegree:['', [Validators.required]],
      currentSalary:[''],
      reasonCode:[''],
      gender:['', [Validators.required]],
      nationality:['', [Validators.required]],
      nativeLanguageId:['', [Validators.required]],
      ethnicOriginId:['', [Validators.required]]
		  });
      this.userInfoService.applicantForm = this.applicantForm;
   }

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
}
