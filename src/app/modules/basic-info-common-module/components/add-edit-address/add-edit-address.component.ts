import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, FormControl } from '@angular/forms';
import { Address } from 'src/app/models/address.model';

import { Observable, forkJoin, map, startWith } from 'rxjs';
import { AppLookUpService } from 'src/app/app-services/app-look-up.service';
import { LookupParameters } from 'src/app/models/look-up.model';
import { TranslationAlignmentService } from 'src/app/app-services/translation-alignment.service';
import { UserInfoService } from 'src/app/modules/user-info/user-info.service';
import { LookUpDto } from 'src/app/models/lookup-dto.model';

@Component({
  selector: 'app-add-edit-address',
  templateUrl: './add-edit-address.component.html',
  styleUrls: ['./add-edit-address.component.scss']
})
export class AddEditAddressComponent implements OnInit{
  public isTranslate: boolean = this.translationService.isTranslate;
  @Input() selectedAddress:Address = new Object() as Address;
  @Output() closeSideNav: EventEmitter<any> = new EventEmitter();
  @Output() addressData: EventEmitter<Address> = new EventEmitter();
  addressForm: UntypedFormGroup;
  private _formBuilder = inject(UntypedFormBuilder);
  address!: Address
  cities:any[]=[];
  citiesArabic:any[]=[];
  nationalityData!: Observable<any[]>;
  nationalityCtrl = new FormControl('');
  selectedNationality:string = '';
  get f() { return this.addressForm.controls; }
  constructor(
    public userInfoService: UserInfoService, 
    public lookupService: AppLookUpService,
    public translationService: TranslationAlignmentService
    ) {
    this.addressForm = this._formBuilder.group({
      Address: [''],
      CountryRegionId: ['', [Validators.required]],
      City: [''],
      streetName: [''],
      zipCode: [''],
      recid:[this.selectedAddress?.recid ? this.selectedAddress?.recid : 0],
      PostalCode: [''],
      description:['']
    });
    this.translationService.languageChange.subscribe( x=> {
      this.isTranslate  = x;
      this.PrepareLangugaeLists();
    });
  }
  ngOnInit(){
   if (this.selectedAddress?.Address !== '') {
     this.addressForm.patchValue({
       ...this.selectedAddress
     });
     this.SetNationalityValue();
     this.changeCountry(this.selectedAddress?.CountryRegionId);
   } else {
     this.addressForm.reset();
   }
   this.nationalityData = this.nationalityCtrl.valueChanges.pipe(
    startWith(''),
    map(value => this.__filterCountries(value || '')),
  );
 }
  CloseAddressNav: () => void = () => {
    this.closeSideNav.emit(true);
  }

  SaveIdentification: () => void = () => {
    if (this.addressForm.valid) {
      this.address = this.addressForm.getRawValue();
      this.address.CountryRegionId = this.selectedNationality;
      this.addressData.emit(this.address);
    } else {
      this.addressForm.markAllAsTouched();
    }
  }
  Discard: () => void = () => {
    this.addressForm.reset();
  }

  async changeCountry(countryId:string) {
    let params:LookupParameters = {
      dataAreaId : 'USMF',
      languageId:'en-us'
    }
    this.cities = [];
    this.userInfoService.citiesList = [];
    this.userInfoService.citiesListArabic = [];
    const lookUps = await forkJoin({
      cities: this.lookupService.GetCityLookup(params, countryId)
    }).toPromise();
    lookUps?.cities?.parmList?.forEach((cities: any) => {
      let data = new Object() as any;
      data.name = cities?.Id;
      data.value = cities.Id;
      this.userInfoService.citiesList.push(data);
    });
    lookUps?.cities?.parmList?.forEach((cities: any) => {
      let data = new Object() as any;
      data.name = cities?.Description;
      data.value = cities.Description;
      this.userInfoService.citiesListArabic.push(data);
    });
    this.PrepareLangugaeLists();
  }
  private __filterCountries(value: string): string[] {
    const filterValue = value?.toLowerCase();
    return this.userInfoService.countryRegions?.filter(countries => countries?.name?.toLowerCase()?.includes(filterValue));
  }
  OnNationlaityChange(event:any){
    let filteredCountry = this.userInfoService.countryRegions?.find(countries => countries?.value === event?.source.value);
    this.nationalityCtrl.setValue(filteredCountry.name);
    this.selectedNationality = filteredCountry.value;
    this.addressForm.controls.CountryRegionId.setValue(filteredCountry?.name);
    this.changeCountry(this.selectedNationality);
  }

  SetNationalityValue(){
    let filteredCountry = this.userInfoService.countryRegions?.find(countries => countries?.value === this.selectedAddress?.CountryRegionId);
    if(filteredCountry){
    this.nationalityCtrl.setValue(filteredCountry.name);
    }
  }
  PrepareLangugaeLists() {
    if (this.translationService.isTranslate) {
      this.cities = this.userInfoService.citiesListArabic;
    } else {
      this.cities = this.userInfoService.citiesList;
    }
  }
}
