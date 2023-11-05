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
import {  ToastrModule } from 'ngx-toastr';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgxUiLoaderConfig, NgxUiLoaderHttpModule, NgxUiLoaderModule, NgxUiLoaderRouterModule } from 'ngx-ui-loader';
import { AuthInterceptorService } from './app-services/http-interceptor.service';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
   bgsColor: 'white',
   bgsOpacity: 0.1,
   bgsPosition: 'bottom-right',
   bgsSize: 20,
   bgsType: 'ball-spin-clockwise',
   blur: 5,
   delay: 0,
   fastFadeOut: true,
   fgsColor: '#1761fd',
   fgsPosition: 'center-center',
   fgsSize: 60,
   fgsType: 'three-strings',
   gap: 24,
   logoPosition: 'center-center',
   logoSize: 280,
   logoUrl: '',
   masterLoaderId: 'master',
   overlayBorderRadius: '0',
   overlayColor: 'rgba(40,40,40,0.5)',
   pbColor: '#1761fd',
   pbDirection: 'ltr',
   pbThickness: 3,
   hasProgressBar: true,
   text: '',
   textColor: '#FFFFFF',
   textPosition: 'center-center',
   maxTime: -1,
   minTime: 300,
  };
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
    NgxUiLoaderHttpModule.forRoot({
       showForeground: true,
    }),
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderRouterModule,
    SharedModule,
    BrowserAnimationsModule,
    MaterialModule,
    CKEditorModule,
    HttpClientModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
