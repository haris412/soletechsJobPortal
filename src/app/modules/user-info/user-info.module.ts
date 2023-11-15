import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MaterialModule } from 'src/app/material/material.module';
import { AddEditBasicinformationComponent } from './add-edit-basicinformation/add-edit-basicinformation.component';

import { ContactInfoComponent } from './contact-info/contact-info.component';
import { AddressComponent } from './address/address.component';
import { IdentificationComponent } from './identification/identification.component';
import { UserInfoComponent } from './user-info.component';
import { UserInfoRoutes } from './user-info-routing.module';
import { RouterModule } from '@angular/router';
import { AddEditContactInfoComponent } from './add-edit-contact-info/add-edit-contact-info.component';
import { AddEditAddressComponent } from './add-edit-address/add-edit-address.component';
import { AddEditIdentificationComponent } from './add-edit-identification/add-edit-identification.component';
import { ToastrModule } from 'ngx-toastr';




@NgModule({
  declarations: [
    UserInfoComponent,
    AddEditBasicinformationComponent,
    ContactInfoComponent,
    AddressComponent,
    IdentificationComponent,
    AddEditContactInfoComponent,
    AddEditAddressComponent,
    AddEditIdentificationComponent,
    
  ],
  imports: [
    RouterModule.forChild(UserInfoRoutes),
    MaterialModule,
    CKEditorModule,
    CommonModule,
    ToastrModule.forRoot(),
  ],
  exports:[
    AddEditBasicinformationComponent,
    ContactInfoComponent,
    AddressComponent,
    IdentificationComponent
  ],
  providers: [],
})
export class UserInfoModule { }
