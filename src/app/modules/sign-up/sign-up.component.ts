import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { User } from 'src/app/models/user';
import { UserInfoService } from '../user-info/user-info.service';
import { AppLookUpService } from 'src/app/app-services/app-look-up.service';

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
		if (this.userInfo.applicantForm.valid) {
			this.userInfo.applicant = this.userInfo.applicantForm.value;
			this.user = this.userForm.value;
			this.userInfo.applicant.birthDate = new Date();
			var data  = await this.lookupService.CreateApplicant(this.userInfo.applicant);
		} else {			
			alert("Sign up form is not valid. Please fill all mandatory fields.");
		}
	}
}
