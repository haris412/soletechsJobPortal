import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
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
  public isFile: boolean = false;
  public fileList: File[] = [];
  recrutmentProjects:any[] = [];
  countryRegions:any[] = [];
  filteredOptions!: Observable<any[]>;
  countriesData!:Observable<any[]>;
  projectsCtrl = new FormControl('');
  countriesCtrl = new FormControl('');
  constructor(
    private router: Router,
    private lookUpService:LookUpService
  ) {}

  ngOnInit(){
    this.fileList = [];
    this.GetLookups();
    this.filteredOptions = this.projectsCtrl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    this.countriesData = this.countriesCtrl.valueChanges.pipe(
      startWith(''),
      map(value => this.__filterCountries(value || '')),
    );
  }

  async GetLookups() {
    let params:LookupParameters = {
      dataAreaId : 'USMF',
      languageId:'en-us'
    }
    const lookups = await forkJoin({
      projects: this.lookUpService.GetRecruitmentLookup(params),
      countries: this.lookUpService.GetCountryRegionLookup(params),
    }).toPromise();
    console.log(lookups);
    lookups?.projects?.parmList?.forEach((projects:any)=> {
    let data = new Object() as any;
      data.name = projects.Description;
      data.value = projects.Id;
      this.recrutmentProjects.push(data);
     }
    );
    lookups?.countries?.parmList.forEach((countries:any)=> {
      let data = new Object() as any;
      data.name = countries.Description;
      data.value = countries.Id;
      this.countryRegions.push(data);
    });
   }

   private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.recrutmentProjects.filter(projects => projects.name.toLowerCase().includes(filterValue));
  }

  private __filterCountries(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.countryRegions.filter(countries => countries.name.toLowerCase().includes(filterValue));
  }
  Back() {
    this.router.navigate(['/'])
  }

  onFileUpload(files: any) {
    this.fileList = files.target.files;
  }

  DeleteFile(selectedFile:File) {
    //this.fileList = this.fileList.filter((file:any)=> file.name !== selectedFile.name);
    this.fileList = [];
  }
}
