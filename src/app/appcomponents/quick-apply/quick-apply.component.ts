import { Component, Input, inject } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, forkJoin, map, startWith } from 'rxjs';
import { LookUpService } from 'src/app/app-services/app.service';
import { LookupParameters } from 'src/app/models/look-up.model';

@Component({
  selector: 'app-quick-apply',
  templateUrl: './quick-apply.component.html',
  styleUrls: ['./quick-apply.component.scss']
})
export class QuickApplyComponent {
  @Input() selectedJob:any =  new Object() as any;
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
    private lookUpService:LookUpService
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
}
