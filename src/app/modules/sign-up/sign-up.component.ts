import { Component, OnInit, inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { User } from 'src/app/models/user';
import { UserInfoService } from '../user-info/user-info.service';
import { AppLookUpService } from 'src/app/app-services/app-look-up.service';
import Swal from "sweetalert2";
import { forkJoin } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { RxwebValidators } from '@rxweb/reactive-form-validators';

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
	editor: string = "";
	index: Number = 1;
	fileData: any;
	imageAvatar: any;
	defaultUrl: string = 'assets/Images/Profile.png';
	fileList: any[] = [];
	private _formBuilder = inject(UntypedFormBuilder);
	userForm: UntypedFormGroup;
	user: User = new User();
	userData:any;
	personalTitle: any[] = [];
	personalSuffix: any[] = [];
	aboutMe:string = '';
	get f() { return this.userForm.controls; }
	strongPassword = false;
	confirmError: boolean = false;
	confirmemailError: boolean = false;
	public emailAlreadyExists: boolean = false;

	constructor(private router: Router,
		public userInfo: UserInfoService,
		public lookupService: AppLookUpService,
		private toastrService: ToastrService) {
		this.userForm = this._formBuilder.group({
			applicantImage:[''],
			firstName: ['', [Validators.required]],
			firstNameAr: [''],
			lastNameAr: [''],
			middleNameAr: [''],
			middleName: ['', [Validators.required]],
			lastName: ['', [Validators.required]],
			mobileNo:['', [Validators.required]],
			email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
			confirmemail: ['', [Validators.required]],
			password: ['', [Validators.required, RxwebValidators.password({validation:{digit: true,specialCharacter: true, upperCase: true} })]],
			confirmpassword: ['', [Validators.required, RxwebValidators.password({validation:{digit: true,specialCharacter: true, upperCase: true} })]],
			aboutMe: ['']

		});
		if (this.userInfo.applicantForm == undefined) {
			this.userInfo.prepareApplicantFormGroup();
		}
	}

	ngOnInit(): void {
		//this.GetLookups();
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
				this.userForm.controls.applicantImage.setValue(this.imageAvatar.substring(this.imageAvatar.indexOf('base64,') + 7, this.imageAvatar.length));
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
		this.userForm?.controls.aboutMe.setValue(this.userForm?.controls.aboutMe.value.replace(/<[^>]*>/g, ''));
		if (this.userForm?.valid && !this.emailAlreadyExists) {
			this.userInfo.applicant = this.userInfo.applicantForm.value;
			this.user = this.userForm.value;
			this.userData = {
				...this.userForm.value,
				aboutMe:this.aboutMe
			}
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
				}).then((result) => {
					if (result['isConfirmed']){
					  this.router.navigate(['/login'])
					}
				  });
			} else {
				Swal.fire({
					title: 'Error',
					icon: 'error',
					text: data?.Message,
					confirmButtonText: 'Ok'
				});
			}
		} else if (this.emailAlreadyExists) {
			this.userForm.markAllAsTouched();
			Swal.fire({
				title: "Alert",
				icon: 'error',
				text: 'Email already exists.',
				confirmButtonText: 'Ok'
			});
		} else if (this.userForm.controls.password.status == "INVALID") {
			this.userForm.markAllAsTouched();
			Swal.fire({
				title: "Alert",
				icon: 'error',
				text: 'Password must contain a upper case letter, a digit and a special character.',
				confirmButtonText: 'Ok'
			});
		} else if (this.userForm.controls.email.status == "INVALID") {
			this.userForm.markAllAsTouched();
			Swal.fire({
				title: "Alert",
				icon: 'error',
				text: 'Please enter valid email address.',
				confirmButtonText: 'Ok'
			});
		} else {
			this.userForm.markAllAsTouched();
			Swal.fire({
				title: "Alert",
				icon: 'error',
				text: 'Please fill all fields of profile.',
				confirmButtonText: 'Ok'
			});
		}
	}

	async validateEmail() {
		var validate = await this.lookupService.ValidateEmail(this.userForm.controls.email.value);
		if (validate != undefined && validate.Status) {
			this.toastrService.error(validate?.Message);
			this.emailAlreadyExists = true;
		} else {
			this.emailAlreadyExists = false;
		}
	}

	onPasswordStrengthChanged(event: boolean) {
		this.strongPassword = event;
	  }

	  ChangeValue() {
		if (this.userForm.controls.password.value != "" && this.userForm.controls.confirmpassword.value != "" && this.userForm.controls.password.value != this.userForm.controls.confirmpassword.value) {
		  this.confirmError = true;
		} else {
		  this.confirmError = false;
		}
	  }
	  
	  validateConfirmEmail() {
		if (this.userForm.controls.email.value != "" && this.userForm.controls.confirmemail.value != "" && this.userForm.controls.email.value != this.userForm.controls.confirmemail.value) {
			this.confirmemailError = true;
		  } else {
			this.confirmemailError = false;
		  }
	  }
}
