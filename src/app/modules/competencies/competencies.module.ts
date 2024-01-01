import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { CompetenciesComponent } from './competencies.component';

import { CompetenciesRoutes } from './competencies-routing.module';
import { RouterModule } from '@angular/router';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MaterialModule } from 'src/app/material/material.module';

import { TranslocoRootModule } from 'src/app/transloco-root.module';
import { CompetenciesCommonModule } from '../competencies-common/competencies-common.module';


@NgModule({
  declarations: [
    
    CompetenciesComponent,
    
  ],
  imports: [
    TranslocoRootModule,
    RouterModule.forChild(CompetenciesRoutes),
    MaterialModule,
    CKEditorModule,
    CommonModule,
    CompetenciesCommonModule
  ],
  
  providers: [DatePipe],
})
export class CompetenciesModule { }
