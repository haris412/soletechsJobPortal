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




@NgModule({
  declarations: [
    UserInfoComponent,
    AddEditBasicinformationComponent,
    
    ContactInfoComponent,
    AddressComponent,
    IdentificationComponent
  ],
  imports: [
    RouterModule.forChild(UserInfoRoutes),
    MaterialModule,
    CKEditorModule,
    CommonModule
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
