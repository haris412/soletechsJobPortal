import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile.component';
import { UserProfileRoutes } from './user-profile-routing';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material/material.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import { RightContentComponent } from './right-content/right-content.component';



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

  ]
})
export class UserProfileModule { }
