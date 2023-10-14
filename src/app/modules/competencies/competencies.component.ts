import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
    selector: 'app-competencies',
    templateUrl: './competencies.component.html',
    styleUrls: ['./competencies.component.scss']
})
export class CompetenciesComponent implements OnInit {

    public completed: boolean = false;
    public isActive: boolean = false;
    public sidenavOpen: boolean = false;
    title = 'angular';
    public Editor = ClassicEditor;
    index: Number = 1;
    stepperTitle: string = 'Skills';

    constructor(private location:Location) { }

    ngOnInit(): void {
    }

    OpenSidenav() {
        this.sidenavOpen = true;
    }

    CloseSidenav() {
        this.sidenavOpen = false;
    }

    Next() {
        if (this.index === 1) {
            this.stepperTitle = 'Professional Experience';
            this.index = 2;
        } else if (this.index === 2) {
            this.stepperTitle = 'Education';
            this.index = 3;
        } else if (this.index === 3) {
            this.stepperTitle = 'Certificates';
            this.index = 4;
        } else if (this.index === 4) {
            this.stepperTitle = 'Courses';
            this.index = 5;
        } else if (this.index === 5) {
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
        }else if(this.index === 5){
            this.stepperTitle = 'Certificates';
            this.index = 4;
        }else if(this.index === 6){
            this.stepperTitle = 'Courses';
            this.index = 5;
        }
    }
    GoBack(){
        this.location.back();
    }
    GoToTab(index:number){
        this.index = index;
    }
}
