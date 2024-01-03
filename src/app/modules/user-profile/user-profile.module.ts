import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { UserProfileComponent } from './user-profile.component';
import { UserProfileRoutes } from './user-profile-routing';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material/material.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import { RightContentComponent } from './right-content/right-content.component';
import { TranslocoRootModule } from 'src/app/transloco-root.module';
import { UserInfoModule } from '../user-info/user-info.module';
import { UserInfoComponent } from '../user-info/user-info.component';
import { BasicInfoCommonModule } from '../basic-info-common-module/basic-info-common.module';
import { CompetenciesCommonModule } from '../competencies-common/competencies-common.module';



@NgModule({
  declarations: [
    UserProfileComponent,
    LeftMenuComponent,
    RightContentComponent
  ],
  imports: [
    RouterModule.forChild(UserProfileRoutes),
    CommonModule,
    MaterialModule,
    CKEditorModule,
    TranslocoRootModule,
    BasicInfoCommonModule,
    CompetenciesCommonModule
  ],
  providers: [DatePipe],
})
export class UserProfileModule { }
