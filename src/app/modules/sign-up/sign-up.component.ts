import { Component, OnInit, inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { User } from 'src/app/models/user';
import { UserInfoService } from '../user-info/user-info.service';
import { AppLookUpService } from 'src/app/app-services/app-look-up.service';
import Swal from "sweetalert2";
import { forkJoin } from 'rxjs';

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
	personalTitle: any[] = [];
	personalSuffix: any[] = [];
	constructor(private router: Router,
		public userInfo: UserInfoService,
		public lookupService: AppLookUpService) {
		this.userForm = this._formBuilder.group({
			applicantImage:[''],
			firstName: ['', [Validators.required]],
			firstNamAr: [''],
			lastNamAr: [''],
			middleNameAr: [''],
			middleName: ['', [Validators.required]],
			lastName: ['', [Validators.required]],
			lastNamePrefix: [''],
			mobile:['', [Validators.required]],
			email: ['', [Validators.required]],
			password: ['', [Validators.required]],
			aboutMe: ['']

		});
		if (this.userInfo.applicantForm == undefined) {
			this.userInfo.prepareApplicantFormGroup();
		}
	}

	ngOnInit(): void {
		this.GetLookups();
	}

	async GetLookups() {
		const lookUps = await forkJoin({
			personalTitle: this.lookupService.GetPersonalTitleLookup(),
			personalSuffix: this.lookupService.GetPersonalSuffixLookup(),
		}).toPromise();

		lookUps?.personalTitle?.parmList?.forEach((personalTitle: any) => {
			let data = new Object() as any;
			data.name = personalTitle.Id;
			data.value = personalTitle.Id;
			this.personalTitle.push(data);
		});
		lookUps?.personalSuffix?.parmList?.forEach((personalSuffix: any) => {
			let data = new Object() as any;
			data.name = personalSuffix.Id;
			data.value = personalSuffix.Id;
			this.personalSuffix.push(data);
		});
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
		this.fileList = [];
	}

	async Signup() {
		if (this.userForm?.valid) {
			this.userInfo.applicant = this.userInfo.applicantForm.value;
			this.user = this.userForm.value;
			var data = await this.lookupService.CreateApplicant(this.user);
			if (data != null && data.Status) {
				this.userInfo.prepareApplicantFormGroup();
				this.userForm.reset();
				localStorage.setItem('applicantId', data?.applicantId);
				localStorage.setItem('recId', data?.applicantPersonRecid);
				Swal.fire({
					title: 'Success',
					icon: 'success',
					text: 'Applicant Created - ' + data?.applicantId,
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
