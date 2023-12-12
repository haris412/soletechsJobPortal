import { Component, inject, OnInit } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { UserInfoService } from '../user-info.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AppLookUpService } from 'src/app/app-services/app-look-up.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-edit-basicinformation',
  templateUrl: './add-edit-basicinformation.component.html',
  styleUrls: ['./add-edit-basicinformation.component.scss']
})
export class AddEditBasicinformationComponent implements OnInit{
  private _applicantFormBuilder = inject(UntypedFormBuilder);

  public completed: boolean = true;
  public sidenavOpen: boolean = false;
  title = 'angular';
  public Editor = ClassicEditor;
  applicantForm!: UntypedFormGroup;
  constructor(public userInfoService: UserInfoService,
              private lookUpService:AppLookUpService,
              private toasterService:ToastrService) {
    this.applicantForm = this._applicantFormBuilder.group({
			currentJobTitle: ['',[Validators.required]],
			firstName:['', [Validators.required]],
			lastName:['', [Validators.required]],
			middleName:['', [Validators.required]],
			maritalStatus:['0', [Validators.required]],
			birthDate:[''],
			highestDegree:['', [Validators.required]],
			currentSalary:[''],
			reasonCode:[''],
      previousEmployee:['0'],
			gender:[ '0' , [Validators.required]],
			nationality:['', [Validators.required]],
			nativeLanguageId:['', [Validators.required]],
			ethnicOriginId:['', [Validators.required]]
		});
   }

   ngOnInit(): void {
    this.applicantForm.patchValue({
      ...this.userInfoService.basicInfo,
      gender: this.userInfoService.basicInfo?.gender?.toString(),
      maritalStatus: this.userInfoService.basicInfo?.maritalStatus?.toString(),
      previousEmployee: this.userInfoService.basicInfo?.previousEmployee?.toString()
    })
    
  }

  OpenSidenav() {
    this.sidenavOpen = true;
    document.body.style.overflow = 'hidden';
  }

  CloseSidenav() {
    this.sidenavOpen = false;
    document.body.style.overflow = 'auto';
  }

  async SaveChanges(){
    if (this.applicantForm?.valid) {
      let profileData: any = {
        ...this.applicantForm.value,
        gender: Number(this.applicantForm?.controls?.gender.value),
        maritalStatus: Number(this.applicantForm?.controls?.maritalStatus?.value),
        previousEmployee: Number(this.applicantForm?.controls?.previousEmployee?.value) ?? 0,
        recid: this.userInfoService?.basicInfo?.recid ? this.userInfoService?.basicInfo?.recid : 0
      }
      try {
        let response = await this.lookUpService.UpdateApplicantProfileGeneral(profileData);
        if (response?.Status) {
          this.toasterService.success(response?.Message);
        } else {
          this.toasterService.error(response?.Message);
        }
      } catch (ex) {
        console.error();
      }
    }
  }
}
