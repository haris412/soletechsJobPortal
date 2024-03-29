import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { forkJoin } from 'rxjs';
import { AppLookUpService } from 'src/app/app-services/app-look-up.service';
import { LookupParameters } from 'src/app/models/look-up.model';

import { TranslationAlignmentService } from 'src/app/app-services/translation-alignment.service';
import { CompetenciesCommonService } from '../competencies-common/components/services/competencies-common.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
    selector: 'app-competencies',
    templateUrl: './competencies.component.html',
    styleUrls: ['./competencies.component.scss']
})
export class CompetenciesComponent implements OnInit {

    public skillCompleted: boolean = false;
    public skillsisActive: boolean = true;
    public experienceCompleted: boolean = false;
    public experienceisActive: boolean = false;
    public educationCompleted: boolean = false;
    public educationisActive: boolean = false;
    public coursesCompleted: boolean = false;
    public coursesisActive: boolean = false;
    public certificatescompleted: boolean = false;
    public certificatesisActive: boolean = false;
    public positionOfTrustcompleted: boolean = false;
    public positionOfTrustisActive: boolean = false;
    public sidenavOpen: boolean = false;
    title = 'angular';
    public Editor = ClassicEditor;
    index: Number = 1;
    stepperTitle: string = 'Skills';
    public isTranslate: boolean = this.translationService.isTranslate;
    constructor(private location: Location,
        public sharedService: SharedService,
        public translationService: TranslationAlignmentService) {
            this.translationService.languageChange.subscribe(x=>{{
                this.isTranslate=x;
              }});
         }

    async ngOnInit() {
        await this.sharedService.GetLookUps();
    }

    OpenSidenav() {
        this.sidenavOpen = true;
    }

    CloseSidenav() {
        this.sidenavOpen = false;
    }

    NextCompetency() {
        if (this.index === 1) {
            this.skillCompleted = true;
            this.experienceisActive = true;
            this.stepperTitle = 'Professional Experience';
            this.index = 2;
        } else if (this.index === 2) {
            this.experienceCompleted = true;
            this.educationisActive = true;
            this.stepperTitle = 'Education';
            this.index = 3;
        } else if (this.index === 3) {
            this.educationCompleted = true;
            this.certificatesisActive = true;
            this.stepperTitle = 'Certificates';
            this.index = 4;
        } else if (this.index === 4) {
            this.certificatescompleted = true;
            this.coursesisActive = true;
            this.stepperTitle = 'Courses';
            this.index = 5;
        } else if (this.index === 5) {
            this.coursesCompleted = true;
            this.positionOfTrustisActive = true;
            this.stepperTitle = 'Position Of Trust';
            this.index = 6;
        }
    }
    PrevCompetency(index: Number) {
        if (index === 2) {
            this.stepperTitle = 'Skills';
            this.index = 1;
        } else if (index === 3) {
            this.stepperTitle = 'Professional Experience';
            this.index = 2;
        } else if (index === 4) {
            this.stepperTitle = 'Education';
            this.index = 3;
        } else if (this.index === 5) {
            this.stepperTitle = 'Certificates';
            this.index = 4;
        } else if (this.index === 6) {
            this.stepperTitle = 'Courses';
            this.index = 5;
        }
    }
    GoBack() {
        this.location.back();
    }
    GoToCompetencyTab(index: number) {
        this.index = index;
        if (index === 2) {
            this.skillsisActive = false;
            this.experienceisActive = true;
            this.educationisActive = false;
            this.certificatesisActive = false;
            this.coursesisActive = false;
            this.positionOfTrustisActive = false;
        } else if (index === 3) {
            this.skillsisActive = false;
            this.experienceisActive = false;
            this.educationisActive = true;
            this.certificatesisActive = false;
            this.coursesisActive = false;
            this.positionOfTrustisActive = false;
        } else if (index === 4) {
            this.skillsisActive = false;
            this.experienceisActive = false;
            this.educationisActive = false;
            this.certificatesisActive = true;
            this.coursesisActive = false;
            this.positionOfTrustisActive = false;
        }else if (index === 5) {
            this.skillsisActive = false;
            this.experienceisActive = false;
            this.educationisActive = false;
            this.certificatesisActive = false;
            this.coursesisActive = true;
            this.positionOfTrustisActive = false;
        }else if (index === 6) {
            this.skillsisActive = false;
            this.experienceisActive = false;
            this.educationisActive = false;
            this.certificatesisActive = false;
            this.coursesisActive = false;
            this.positionOfTrustisActive = true;
        } else if (index === 1) {
            this.skillsisActive = true;
            this.experienceisActive = false;
            this.educationisActive = false;
            this.certificatesisActive = false;
            this.coursesisActive = false;
            this.positionOfTrustisActive = false;
        }
    }
}
