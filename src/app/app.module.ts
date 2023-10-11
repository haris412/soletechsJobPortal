import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JobsComponent } from './appcomponents/jobs/jobs.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { MaterialModule } from './material/material.module';
import { JobsListComponent } from './appcomponents/jobs-list/jobs-list.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { QuickApplyComponent } from './appcomponents/quick-apply/quick-apply.component';
import { LinkedInRedirectComponent } from './modules/linkedIn-redirect/linkedIn-redirect.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ToastContainerModule, ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    JobsComponent,
    JobsListComponent,
    QuickApplyComponent,
    LinkedInRedirectComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    SharedModule,
    BrowserAnimationsModule,
    MaterialModule,
    CKEditorModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
