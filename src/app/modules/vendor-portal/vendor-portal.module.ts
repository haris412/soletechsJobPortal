import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material/material.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { vendorRoutes } from './vendor.routing.module';
import { VendorComponent } from './vendor.component';
import { VendorDashboardComponent } from './components/vendor-dashboard/vendor-dashboard.component';



@NgModule({
  declarations: [
    VendorComponent,
    VendorDashboardComponent
  ],
  imports: [
    HttpClientModule,
    RouterModule.forChild(vendorRoutes),
    CommonModule,
    MaterialModule,
    CKEditorModule,
    ToastrModule.forRoot(),
  ],
})
export class VendorPortalModule { }
