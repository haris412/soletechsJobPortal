import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { forkJoin } from 'rxjs';
import { AppLookUpService } from 'src/app/app-services/app-look-up.service';
import { LookupParameters } from 'src/app/models/look-up.model';
import { CompetenciesCommonService } from './services/competencies-common.service';

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

    constructor(private location: Location,
        private lookUpService: AppLookUpService,
        private competenciesService: CompetenciesCommonService) { }

    ngOnInit(): void {
        this.GetLookUps();
    }

    async GetLookUps() {
        let params: LookupParameters = {
            dataAreaId: 'USMF',
            languageId: 'en-us'
        }
        const lookUps = await forkJoin({
            skills: this.lookUpService.GetSkillLookup(params),
            skillLevel: this.lookUpService.GetRatingLevelLookupList(params),
            educationInstitution: this.lookUpService.GetEducationInstitutionLookupList(params),
            educationDiscipline: this.lookUpService.GetEducationDisciplineLookupList(params),
            certificateTypes: this.lookUpService.getCertificateTypeLookUpList(params),
            personalTitle: this.lookUpService.GetPersonalTitleLookupList(params),
            educationLevel: this.lookUpService.GetEducationLevelLookupList(params),
        }).toPromise();
        lookUps?.skills?.parmList?.forEach((projects: any) => {
            let data = new Object() as any;
            data.name = projects.Description;
            data.value = projects.Id;
            this.competenciesService.skillsList.push(data);
        }
        );
        lookUps?.skillLevel?.parmList?.forEach((projects: any) => {
            let data = new Object() as any;
            data.name = projects.Description;
            data.value = projects.Id;
            this.competenciesService.skillLevelList.push(data);
        }
        );
        lookUps?.educationInstitution?.parmList?.forEach((projects: any) => {
            let data = new Object() as any;
            data.name = projects.Description;
            data.value = projects.Id;
            this.competenciesService.educationInstitutionList.push(data);
        }
        );
        lookUps?.educationDiscipline?.parmList?.forEach((projects: any) => {
            let data = new Object() as any;
            data.name = projects.Description;
            data.value = projects.Id;
            this.competenciesService.educationDesciplineList.push(data);
        }
        );
        lookUps?.certificateTypes?.parmList?.forEach((projects: any) => {
            let data = new Object() as any;
            data.name = projects.Description;
            data.value = projects.Id;
            this.competenciesService.certificateTypesList.push(data);
        }
        );
        lookUps?.personalTitle?.parmList?.forEach((projects: any) => {
            let data = new Object() as any;
            data.name = projects.Description;
            data.value = projects.Id;
            this.competenciesService.personalTitleList.push(data);
        }
        );
        lookUps?.educationLevel?.parmList?.forEach((projects: any) => {
            let data = new Object() as any;
            data.name = projects.Description;
            data.value = projects.Id;
            this.competenciesService.educationLevelList.push(data);
        }
        );
    }

    OpenSidenav() {
        this.sidenavOpen = true;
        
    }

    CloseSidenav() {
        this.sidenavOpen = false;
    }

    Next() {
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
    Back(index: Number) {
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
    GoToTab(index: number) {
        this.index = index;
    }
}
