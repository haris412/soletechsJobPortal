import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, forkJoin, map, startWith } from 'rxjs';
import { AppLookUpService } from 'src/app/app-services/app-look-up.service';
import { ApplicationService } from 'src/app/app-services/application.service';
import { Application } from 'src/app/models/applicatiom.model';
import { Job } from 'src/app/models/job.model';
import { LookupParameters } from 'src/app/models/look-up.model';

@Component({
  selector: 'app-quick-apply',
  templateUrl: './quick-apply.component.html',
  styleUrls: ['./quick-apply.component.scss']
})
export class QuickApplyComponent {
  @Input() selectedJob:any =  new Object() as any;
  @Input() recruitmentProject:Job = new Object() as Job;
  @Output() closeClicked: EventEmitter<boolean> = new EventEmitter();

  public isFile: boolean = false;
  public fileList: File[] = [];
  recrutmentProjects:any[] = [];
  countryRegions:any[] = [];
  degrees:any[]=[];
  filteredOptions!: Observable<any[]>;
  degreeOptions!: Observable<any[]>;
  nationalityData!: Observable<any[]>;
  countriesData!:Observable<any[]>;
  degreeCtrl = new FormControl('');
  countriesCtrl = new FormControl('');
  nationalityCtrl = new FormControl('');
  private _formBuilder = inject(UntypedFormBuilder);
  quickApplyForm: UntypedFormGroup;
  separateDialCode = false;
  constructor(
    private router: Router,
    private lookUpService:AppLookUpService,
    private applicationService:ApplicationService,
    private toastrService: ToastrService,

  ) {
    this.quickApplyForm = this._formBuilder.group({
      name:[''],
      nameAr: ['',[Validators.required]],
      recruitmentProject: [this.selectedJob?.jobId, [Validators.required]],
      nationality: ['', [Validators.required]],
      email:['',[Validators.required]],
      mobile:['',[Validators.required]],
      linkedIn: [''],
      highestDegree:[''],
      currentAddressLocal:['',[Validators.required]],
      currentAddressOut: [''],
      dateOfBirth: [''],
      hasResidentIdentity:[''],
      periodToJoin:[''],
      attachment: [''],
    });
  }

  ngOnInit(){
    console.log(this.selectedJob);
    this.quickApplyForm?.controls?.recruitmentProject.setValue(this.selectedJob?.jobId);
    this.quickApplyForm?.controls?.recruitmentProject.disable();
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

    this.nationalityData = this.nationalityCtrl.valueChanges.pipe(
      startWith(''),
      map(value => this.__filterCountries(value || '')),
    );
  }

  async GetLookups() {
    let params:LookupParameters = {
      dataAreaId : 'USMF',
      languageId:'en-us'
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
    lookUps?.countries?.parmList?.forEach((countries:any)=> {
      let data = new Object() as any;
      data.name = countries?.Description;
      data.value = countries?.Id;
      this.countryRegions.push(data);
    });
    lookUps?.highestDegree?.parmList?.forEach((degree:any)=> {
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

  private __filterCountries(value: string): string[] {
    const filterValue = value?.toLowerCase();
    return this.countryRegions?.filter(countries => countries?.name?.toLowerCase()?.includes(filterValue));
  }

  OnNationlaityChange(event:any){
    console.log(event);
  }
  Back() {
    this.router.navigate(['/'])
  }

  onFileUpload(files: any) {
    this.fileList = files.target.files;
  }

  DeleteFile(selectedFile:File) {
    this.fileList = [];
  }
  CloseSidenav() {
    this.closeClicked.emit(true);
  }
  async QuickApply(){
    let applicationData: Application = {
      correspondanceAction: 4,
      dateOfReception: '2015-10-03T12:00:00',
      createdSource: 0,
      skipRecruitingStatusCheck: 0,
      travelCost: 0.0,
      Status: 1,
      startDatetime: '2015-10-15T07:00:00Z',
      reasonCode: 0,
      rating: 2,
      otherCost: 0.0,
      job: this.recruitmentProject?.job,
      mediaId: 'Weekly New',
      applicationId: '00026',
      hiringManager: this.recruitmentProject?.hiringManager,
      expireDate: this.recruitmentProject?.EndDate,
      departmentRecId: this.recruitmentProject.department,
      expectedSalary: 0.0,
      currentSalary: 0.0,
      referrer: '',
      lodgingCostMST: 0.0,
      RecruitingId: this.recruitmentProject.recruitingId,
      HcmApplicantId: '000015'
    }
    try {
      let applicationResponse = await this.applicationService.SaveApplication(applicationData);
      if (applicationResponse.Status) {
        this.toastrService.success(applicationResponse?.Message);
        this.closeClicked.emit(true);
      } else {
        this.toastrService.error(applicationResponse?.Message);
      }
    } catch (ex) {
      console.error();
    }
  }
}
