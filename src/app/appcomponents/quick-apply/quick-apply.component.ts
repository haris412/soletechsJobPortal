import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Country } from 'ngx-mat-intl-tel-input/lib/model/country.model';
import { ToastrService } from 'ngx-toastr';
import { Observable, forkJoin, map, startWith } from 'rxjs';
import { AppLookUpService } from 'src/app/app-services/app-look-up.service';
import { ApplicationService } from 'src/app/app-services/application.service';
import { Application } from 'src/app/models/applicatiom.model';
import { Job } from 'src/app/models/job.model';
import { LookupParameters } from 'src/app/models/look-up.model';
import { ApplicantDataService } from 'src/app/modules/applicant-portal/services/applicant-shared.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-quick-apply',
  templateUrl: './quick-apply.component.html',
  styleUrls: ['./quick-apply.component.scss']
})
export class QuickApplyComponent implements OnInit {
  @Input() selectedJob: any = new Object() as any;
  @Input() recruitmentProject: Job = new Object() as Job;
  @Output() closeClicked: EventEmitter<boolean> = new EventEmitter();

  public isFile: boolean = false;
  public fileList: File[] = [];
  recrutmentProjects: any[] = [];
  countryRegions: any[] = [];
  cities: any[] = [];
  degrees: any[] = [];
  filteredOptions!: Observable<any[]>;
  degreeOptions!: Observable<any[]>;
  nationalityData!: Observable<any[]>;
  countriesData!: Observable<any[]>;
  citiesData!: Observable<any[]>;
  degreeCtrl = new FormControl('');
  countriesCtrl = new FormControl('');
  citiesCtrl = new FormControl('');
  nationalityCtrl = new FormControl('');
  private _formBuilder = inject(UntypedFormBuilder);
  quickApplyForm: UntypedFormGroup;
  separateDialCode = false;
  name: string = '';
  email: string = '';
  phonePlaceHolder:any;
  get f() { return this.quickApplyForm.controls; }
  constructor(
    private router: Router,
    private lookUpService: AppLookUpService,
    private applicationService: ApplicationService,
    private toastrService: ToastrService,
    public applicant: ApplicantDataService,
    public sharedService: SharedService 
  ) {
    this.name = localStorage.getItem('userName') ?? '';
    this.email = localStorage.getItem('email') ?? '';

    this.quickApplyForm = this._formBuilder.group({
      name: [this.name, [Validators.required]],
      nameAr: ['',[Validators.required]],
      recruitmentProject: [this.recruitmentProject?.recruitingId, [Validators.required]],
      nationality: [''],
      email: [this.email, [Validators.required]],
      phone: ['', [Validators.required]],
      linkedIn: [''],
      highestDegree: ['', [Validators.required]],
      address: [''],
      currentAddressOut: [''],
      dateOfBirth: ['', [Validators.required]],
      residentIdentity: [0],
      residentIdentityProfessional: [''],
      periodJoin: [''],
      attachment: ['']
    });
  }

  async ngOnInit() {
    this.quickApplyForm?.controls?.nameAr.setValue(this.applicant.applicantData?.nameAr);
    this.quickApplyForm?.controls?.recruitmentProject.setValue(this.recruitmentProject?.recruitingId);
    this.quickApplyForm?.controls?.recruitmentProject.disable();
    this.quickApplyForm?.controls?.phone.setValue(this.applicant.applicantData?.mobileNo ?? "");
    this.quickApplyForm?.controls?.dateOfBirth.setValue(this.applicant.applicantData?.birthDate ?? "");
    this.quickApplyForm?.controls?.nationality.setValue(this.applicant.applicantData?.nationality ?? "");
    this.quickApplyForm?.controls?.highestDegree.setValue(this.applicant.applicantData?.highestDegree ?? "");
    this.degreeCtrl.setValue(this.applicant.applicantData?.highestDegree ?? "");
    this.fileList = [];
    this.GetLookups();
    this.degreeOptions = this.degreeCtrl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    this.countriesData = this.countriesCtrl.valueChanges.pipe(
      startWith(''),
      map(value => this.__filterCountries(value || '')),
    );

    this.citiesData = this.citiesCtrl.valueChanges.pipe(
      startWith(''),
      map(value => this.__filterCountries(value || '')),
    );

    this.nationalityData = this.nationalityCtrl.valueChanges.pipe(
      startWith(''),
      map(value => this.__filterCountries(value || '')),
    );
  }

  async GetLookups() {
    let params: LookupParameters = {
      dataAreaId: 'USMF',
      languageId: 'en-us'
    }
    const lookUps = await forkJoin({
      projects: this.lookUpService.GetRecruitmentLookup(params),
      countries: this.lookUpService.GetCountryRegionLookup(params),
      highestDegree: this.lookUpService.GetHighestDegreeLookUp(params)
    }).toPromise();
    lookUps?.projects?.parmList?.forEach((projects: any) => {
      let data = new Object() as any;
      data.name = projects?.Description;
      data.value = projects?.Id;
      this.recrutmentProjects.push(data);
    }
    );
    lookUps?.countries?.parmList?.forEach((countries: any) => {
      let data = new Object() as any;
      data.name = countries?.Description;
      data.value = countries?.Id;
      this.countryRegions.push(data);
    });
    lookUps?.highestDegree?.parmList?.forEach((degree: any) => {
      let data = new Object() as any;
      data.name = degree?.Description;
      data.value = degree?.Id;
      this.degrees.push(data);
    })
  }

  private _filter(value: string): string[] {
    const filterValue = value?.toLowerCase();
    return this.degrees?.filter(degree => degree?.name?.toLowerCase()?.includes(filterValue));
  }

  degreeDefaultSearch() {
    this.degreeOptions = this.degreeCtrl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  nationalityDefaultSearch() {
    this.nationalityData = this.nationalityCtrl.valueChanges.pipe(
      startWith(''),
      map(value => this.__filterCountries(value || '')),
    );
  }

  countryDefaultSearch() {
    this.countriesData = this.countriesCtrl.valueChanges.pipe(
      startWith(''),
      map(value => this.__filterCountries(value || '')),
    );
  }

  citiesDefaultSearch() {
    this.citiesData = this.citiesCtrl.valueChanges.pipe(
      startWith(''),
      map(value => this.__filterCities(value || '')),
    );
  }

  private __filterCountries(value: string): string[] {
    const filterValue = value?.toLowerCase();
    return this.countryRegions?.filter(countries => countries?.name?.toLowerCase()?.includes(filterValue));
  }

  private __filterCities(value: string): string[] {
    const filterValue = value?.toLowerCase();
    return this.cities?.filter(countries => countries?.name?.toLowerCase()?.includes(filterValue));
  }

  OnNationlaityChange(event: any) {
  }

  Back() {
    this.router.navigate(['/'])
  }

  onFileUpload(files: any) {
    this.fileList = files.target.files;
  }

  DeleteFile(selectedFile: File) {
    this.fileList = [];
  }
  CloseSidenav() {
    this.closeClicked.emit(true);
  }
  SelectionChange(event: any) {
  }

  async QuickApply() {
    this.quickApplyForm.controls.highestDegree.setValue(this.degreeCtrl.value);
    this.quickApplyForm.controls.nationality.setValue(this.nationalityCtrl.value);
    this.quickApplyForm.controls.address.setValue(this.countriesCtrl.value);
    this.quickApplyForm.controls.currentAddressOut.setValue(this.citiesCtrl.value);
    if (this.quickApplyForm.valid) {
      let applicationData: Application = {
        ...this.quickApplyForm.getRawValue(),
        periodJoin: Number(this.quickApplyForm.controls['periodJoin']?.value),
        applicantIdRecid: Number(localStorage.getItem('recId')),
        applicantpersonRecid:Number(localStorage.getItem('applicantPersonRecid'))
      }
      try {
        let applicationResponse = await this.applicationService.SaveApplication(applicationData);
        if (applicationResponse.Status) {
          this.toastrService.success(applicationResponse?.Message);
          this.sharedService.applied = true;
          this.sharedService.GetAppliedJobs();
          this.closeClicked.emit(true);
        } else {
          this.toastrService.error(applicationResponse?.Message);
        }
      } catch (ex) {
        console.error();
      }
    } else {
      this.quickApplyForm.markAllAsTouched();
    }
  }
  OnCountryChanged(event:Country){
		this.phonePlaceHolder = event?.placeHolder;
	  }

    async changeCountry() {
      let countryid = this.countriesCtrl.value ?? "";
      let params:LookupParameters = {
        dataAreaId : 'USMF',
        languageId:'en-us'
      }
      const lookUps = await forkJoin({
        cities: this.lookUpService.GetCityLookup(params, countryid)
      }).toPromise();
      this.cities = [];
      this.citiesCtrl.setValue("");
      lookUps?.cities?.parmList?.forEach((cities: any) => {
        let data = new Object() as any;
        data.name = cities?.Id;
        data.value = cities.Id;
        this.cities.push(data);
      }
      );
      this.citiesDefaultSearch();
    }
}
