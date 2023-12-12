import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Address } from 'src/app/models/address.model';
import { UserInfoService } from '../user-info.service';
import { forkJoin } from 'rxjs';
import { AppLookUpService } from 'src/app/app-services/app-look-up.service';
import { LookupParameters } from 'src/app/models/look-up.model';

@Component({
  selector: 'app-add-edit-address',
  templateUrl: './add-edit-address.component.html',
  styleUrls: ['./add-edit-address.component.scss']
})
export class AddEditAddressComponent implements OnInit{

  @Input() selectedAddress:Address = new Object() as Address;
  @Output() closeSideNav: EventEmitter<any> = new EventEmitter();
  @Output() addressData: EventEmitter<Address> = new EventEmitter();
  addressForm: UntypedFormGroup;
  private _formBuilder = inject(UntypedFormBuilder);
  identification!: Address
  cities:any[]=[];
  get f() { return this.addressForm.controls; }
  constructor(public userInfoService: UserInfoService
            , public lookupService: AppLookUpService) {
    this.addressForm = this._formBuilder.group({
      Address: ['', [Validators.required]],
      CountryRegionId: ['', [Validators.required]],
      City: [''],
      streetName: ['',[Validators.required]],
      zipCode: ['', [Validators.required]],
      recid:[this.selectedAddress?.recid ? this.selectedAddress?.recid : 0],
      PostalCode: [''],
      description:['']
    });
  }
  ngOnInit(){
   if (this.selectedAddress?.Address !== '') {
     this.addressForm.patchValue({
       ...this.selectedAddress
     });
   } else {
     this.addressForm.reset();
   }
 }
  CloseAddressNav: () => void = () => {
    this.closeSideNav.emit(true);
  }

  SaveIdentification: () => void = () => {
    if (this.addressForm.valid) {
      this.identification = this.addressForm.getRawValue();
      this.addressData.emit(this.identification);
    } else {
      this.addressForm.markAllAsTouched();
    }
  }
  Discard: () => void = () => {
    this.addressForm.reset();
  }

  async changeCountry() {
    var address = this.addressForm.value;
    let countryid = address.CountryRegionId;
    let params:LookupParameters = {
      dataAreaId : 'USMF',
      languageId:'en-us'
    }
    const lookUps = await forkJoin({
      cities: this.lookupService.GetCityLookup(params, countryid)
    }).toPromise();
    lookUps?.cities?.parmList?.forEach((cities: any) => {
      let data = new Object() as any;
      data.name = cities?.Id;
      data.value = cities.Id;
      this.cities.push(data);
    }
    );
  }
}
