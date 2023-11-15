import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { User } from 'src/app/models/user';
import { UserInfoService } from '../user-info/user-info.service';
import { AppLookUpService } from 'src/app/app-services/app-look-up.service';
import Swal from "sweetalert2";

@Component({
	selector: 'app-signup',
	templateUrl: './sign-up.component.html',
	styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

	public completed: boolean = true;
	public sidenavOpen: boolean = false;
	title = 'angular';
	public Editor = ClassicEditor;
	index: Number = 1;
	fileData: any;
	imageAvatar: any;
	defaultUrl: string = 'assets/Images/Profile.png';
	fileList: any[] = [];
	private _formBuilder = inject(UntypedFormBuilder);
	userForm: UntypedFormGroup;
	user: User = new User();

	constructor(private router: Router,
				public userInfo: UserInfoService,
				public lookupService: AppLookUpService) {
		this.userForm = this._formBuilder.group({
			email:['',[Validators.required]],
			password:['',[Validators.required]]
		  });
		if (this.userInfo.applicantForm == undefined) {
			this.userInfo.prepareApplicantFormGroup();
        }
	}

	ngOnInit(): void { 
	}

	OpenSidenav() {
		this.sidenavOpen = true;
	}

	CloseSidenav() {
		this.sidenavOpen = false;
	}

	Next() {
		if (this.index === 1) {
			this.index = 2;
		} else if (this.index === 2) {
			this.index = 3;
		} else if (this.index === 3) {
			this.index = 4;
		} else if (this.index === 4) {
			this.index = 5;
		} else if (this.index === 5) {
			this.index = 6;
		}
	}
	Back(index: Number) {

	}
	RouteToProfile() {
		this.router.navigate(['/profile']);
	}
	RouteToCompetencies() {
		this.router.navigate(['/competencies']);
	}
	selectFile(event: any) {
		if (event.target.files[0].type == 'image/jpeg' || event.target.files[0].type == 'image/png') {
			this.fileData = event.target.files[0];
			const reader = new FileReader();
			reader.readAsDataURL(this.fileData);
			reader.onload = () => {
				this.imageAvatar = reader.result;
			};
		} else {
			alert("file type should be image of jpeg or png")
			return;
		}
	}
	onFileUpload(files: any) {
		this.fileList = files.target.files;
	}

	DeleteFile(selectedFile: File) {
		//this.fileList = this.fileList.filter((file:any)=> file.name !== selectedFile.name);
		this.fileList = [];
	}

	async Signup() {
		if (this.userInfo?.applicantForm?.valid) {
			this.userInfo.applicant = this.userInfo.applicantForm.value;
			this.user = this.userForm.value;
			this.userInfo.applicant.personRecid = '22565424329';
			var data  = await this.lookupService.CreateApplicant(this.userInfo.applicant);
			if (data != null && data.Status) {
				this.userInfo.prepareApplicantFormGroup();
				Swal.fire({
					title: 'Success',
					icon: 'success',
					text: 'Applicant Created - ' + data?.Recid,
					confirmButtonText: 'Ok'
			  });
			} else {
				Swal.fire({
					title: 'Error',
					icon: 'error',
					text: data?.Message,
					confirmButtonText: 'Ok'
				});
			}
		} else {			
			Swal.fire({
				title: "Alert",
				icon: 'error',
				text: 'Please fill all fields of profile.',
				confirmButtonText: 'Ok'
			});
		}
	}
}
