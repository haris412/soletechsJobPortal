import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditAddressComponent } from './components/add-edit-address/add-edit-address.component';
import { AddEditBasicinformationComponent } from './components/add-edit-basicinformation/add-edit-basicinformation.component';
import { AddEditContactInfoComponent } from './components/add-edit-contact-info/add-edit-contact-info.component';
import { AddEditIdentificationComponent } from './components/add-edit-identification/add-edit-identification.component';
import { AddressComponent } from './components/address/address.component';
import { ContactInfoComponent } from './components/contact-info/contact-info.component';
import { IdentificationComponent } from './components/identification/identification.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';
import { ToastrModule } from 'ngx-toastr';
import { MaterialModule } from 'src/app/material/material.module';
import { TranslocoRootModule } from 'src/app/transloco-root.module';

@NgModule({
  declarations: [
    AddEditBasicinformationComponent,
    ContactInfoComponent,
    AddressComponent,
    IdentificationComponent,
    AddEditContactInfoComponent,
    AddEditAddressComponent,
    AddEditIdentificationComponent,
  ],
  imports: [
    TranslocoRootModule,
    MaterialModule,
    CKEditorModule,
    CommonModule,
    NgxMatIntlTelInputComponent,
    ToastrModule.forRoot(),
  ],
  
  exports : [
    AddEditBasicinformationComponent,
    ContactInfoComponent,
    AddressComponent,
    IdentificationComponent,
    AddEditContactInfoComponent,
    AddEditAddressComponent,
    AddEditIdentificationComponent,
  ]
})
export class BasicInfoCommonModule { }
