import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MaterialModule } from 'src/app/material/material.module';
import { UserInfoComponent } from './user-info.component';
import { UserInfoRoutes } from './user-info-routing.module';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { TranslocoRootModule } from 'src/app/transloco-root.module';
import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';
import { BasicInfoCommonModule } from '../basic-info-common-module/basic-info-common.module';




@NgModule({
  declarations: [
    UserInfoComponent,
    
    
  ],
  imports: [
    TranslocoRootModule,
    RouterModule.forChild(UserInfoRoutes),
    MaterialModule,
    CKEditorModule,
    CommonModule,
    NgxMatIntlTelInputComponent,
    ToastrModule.forRoot(),
    BasicInfoCommonModule
  ],
  exports:[
    UserInfoComponent,
    
  ],
  providers: [],
})
export class UserInfoModule { }
