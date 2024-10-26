import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { User } from 'src/app/models/user';
import { UserInfoService } from '../user-info/user-info.service';
import { AppLookUpService } from 'src/app/app-services/app-look-up.service';
import Swal from "sweetalert2";
import { forkJoin, map, Observable, startWith } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { TranslationAlignmentService } from 'src/app/app-services/translation-alignment.service';
import { Country } from 'ngx-mat-intl-tel-input/lib/model/country.model';
import { LookupParameters } from 'src/app/models/look-up.model';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';

@Component({
	selector: 'app-signup',
	templateUrl: './sign-up.component.html',
	styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
	@ViewChild(MatAutocompleteTrigger) autocompleteTrigger!: MatAutocompleteTrigger;
	public completed: boolean = true;
	public sidenavOpen: boolean = false;
	title = 'angular';
	public Editor = ClassicEditor;
	editor: string = "";
	index: Number = 1;
	fileData: any;
	imageAvatar: any;
	cvData: any
	fileCvData: any;
	defaultUrl: string = 'assets/Images/default-image.png';
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
	public isTranslate: boolean =  this.translationService.isTranslate;
	phonePlaceHolder :any = "";
	identificationType:any[]=[];
	countries:any[]=[];
	nationalityData!: Observable<any[]>;
	nationalityCtrl = new FormControl('');
	selectedNationality:string = '';
	constructor(private router: Router,
		public userInfo: UserInfoService,
		public lookupService: AppLookUpService,
		private toastrService: ToastrService,
		public translationService: TranslationAlignmentService,

		) {
		this.userForm = this._formBuilder.group({
			applicantImage:[''],
			firstName: ['', [Validators.required]],
			firstNameAr: [''],
			lastNameAr: [''],
			middleNameAr: [''],
			middleName: [''],
			identificationNumber: ['', [Validators.required, Validators.maxLength(10)]],
			lastName: ['', [Validators.required]],
			mobileNo:['', [Validators.required]],
			currentJobTitle:['',[Validators.required]],
			email: ['', [Validators.required, Validators.email]],
			confirmemail: ['', [Validators.required,Validators.email]],
			password: ['', [Validators.required, RxwebValidators.password({validation:{digit: true,specialCharacter: true, upperCase: true} })]],
			confirmpassword: ['', [Validators.required, RxwebValidators.password({validation:{digit: true,specialCharacter: true, upperCase: true} })]],
			aboutMe: [''],
			cvAttachment: [''],
			ipAddress: [''],
			IdentificationType:['',[Validators.required]],
			nationality:['',[Validators.required]],
			fileName: ['']
		});
		if (this.userInfo.applicantForm == undefined) {
			this.userInfo.prepareApplicantFormGroup();
		}
		this.translationService.languageChange.subscribe( x=> {
			this.isTranslate = x;
			this.ArabicList();
		});
		this.nationalityData = this.nationalityCtrl.valueChanges.pipe(
			startWith(''),
			map(value => this.__filterCountries(value || '')),
		  );
	}
    
	async ngOnInit() {
		let params: LookupParameters = {
			dataAreaId: 'USMF',
			languageId: 'en-us'
		}
		var ipaddress = await this.lookupService.GetIpAddress();
		this.userForm?.controls?.ipAddress.setValue(ipaddress ?? "");
		this.userForm?.controls?.ipAddress.disable();
		//this.GetLookups();
		this.GetIdentificationTypeLookup()
	}
	async GetIdentificationTypeLookup(){
		let params:LookupParameters = {
			dataAreaId: 'USMF',
			languageId: this.translationService.isTranslate ? 'ar': 'en-us'
		}
		const lookUps = await forkJoin({
			countries: this.lookupService.GetCountryRegionLookup(params),
			identificationType: this.lookupService.GetIdentificationTypeLookup(params),
		}).toPromise();
		lookUps?.identificationType?.parmList?.forEach((projects: any) => {
			let data = new Object() as any;
			data.name = this.translationService.isTranslate && projects.Other ? projects.Other : projects.Description;
			data.value = projects.Id;
			this.identificationType.push(data);
		});
		lookUps?.countries?.parmList?.forEach((projects: any) => {
			let data = new Object() as any;
			data.name = projects.Description;
			data.value = projects.Id;
			this.countries.push(data);
		});
    }
	PrepopulateNationality(){

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
          this.userForm.controls.cvAttachment.setValue(
            this.cvData.substring(
              this.cvData.indexOf('base64,') + 7,
              this.cvData.length
            )
          );
          this.userForm.controls.fileName.setValue(this.fileCvData.name);
        };
        this.fileList = files.target.files;
      } else {
		this.toastrService.error('Only PDF and Word files are allowed');
      }
    }
	}

	DeleteFile(selectedFile: File) {
		this.fileList = [];
	}
	nationalityDefaultSearch() {
		this.nationalityData = this.nationalityCtrl.valueChanges.pipe(
		  startWith(''),
		  map(value => this.__filterCountries(value || '')),
		);
	  }

	async Signup() {
		this.userForm?.controls.aboutMe.setValue(this.userForm?.controls.aboutMe.value.replace(/<[^>]*>/g, ''));
		if (this.userForm?.valid && !this.emailAlreadyExists) {
			this.userInfo.applicant = this.userInfo.applicantForm.value;
			this.user = this.userForm.getRawValue();
			this.userData = {
				...this.userForm.getRawValue(),
				ipAddress: this.userForm?.controls.ipAddress.value,
				attachmentFileName: this.userForm?.controls.fileName.value,
				nationality : this.selectedNationality,
				attachmentForWeb : this.userForm.controls.cvAttachment.value !== ''?  1: 0 
				//aboutMe:this.aboutMe
			}
			
			this.userData['isDefender'] = this.lookupService.GetIsDefenderEnabled();
			var data = await this.lookupService.CreateApplicant(this.userData);
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
			} else if (data != null && data.isVirus) {
				Swal.fire({
					title: 'Error',
					icon: 'error',
					text: "File contains virus. Please try with valid attachment.",
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
	openDropdown() {
		// Programmatically open the dropdown only when clicked
		if (!this.autocompleteTrigger.panelOpen) {
		  this.autocompleteTrigger.openPanel();
		}
	  }
	async validateEmail() {
		var validate = await this.lookupService.ValidateEmail(this.userForm.controls.email.value);
		if (validate != undefined && validate.status) {
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
	  OnCountryChanged(event:Country){
		this.phonePlaceHolder = event?.placeHolder;
	  }

	  validateNumber(event: any) {
		const keyCode = event.keyCode;
	
		const excludedKeys = [8, 37, 39, 46];
	
		if (!((keyCode >= 48 && keyCode <= 57) ||
		  (keyCode >= 96 && keyCode <= 105) ||
		  (excludedKeys.includes(keyCode)))) {
		  event.preventDefault();
		}
	  }
	  ArabicList() {
		this.countries = [];
		this.identificationType = [];
		this.GetIdentificationTypeLookup();
	  }
	  private __filterCountries(value: string): string[] {
		const filterValue = value?.toLowerCase();
		return this.countries?.filter(countries => countries?.name?.toLowerCase()?.includes(filterValue));
	  }
	  OnNationlaityChange(event:any){
		let filteredCountry = this.countries?.find(countries => countries?.value === event?.source.value);
		this.nationalityCtrl.setValue(filteredCountry.name);
		this.userForm?.controls?.nationality.setValue(filteredCountry.name ?? "");
		this.selectedNationality = filteredCountry.value;
	  }
}
