import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AddEditProfileComponent } from './add-edit-profile/add-edit-profile.component';
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
import { BasicInfoComponent } from './basic-info/basic-info.component';
import { ToastContainerModule, ToastrModule } from 'ngx-toastr';




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
    BasicInfoComponent
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
