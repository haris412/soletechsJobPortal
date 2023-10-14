import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
    selector: 'app-user-info',
    templateUrl: './user-info.component.html',
    styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

    public completed: boolean = false;
    public sidenavOpen: boolean = false;
    public isActive: boolean = false;
    title = 'soletech';
    public Editor = ClassicEditor;
    index: Number = 1;
    stepperTitle: string = 'Basic Info';
    constructor(private location: Location) { }

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
            this.index = 2;
            this.stepperTitle = 'Contact';
        } else if (this.index === 2) {
            this.index = 3;
            this.stepperTitle = 'Address';
        } else if (this.index === 3) {
            this.stepperTitle = 'Identification';
            this.index = 4;
        }
    }
    Back(index: Number) {
        if (index === 2) {
            this.stepperTitle = 'Basic Info';
            this.index = 1;
        } else if (index === 3) {
            this.stepperTitle = 'Contact';
            this.index = 2;
        } else if (index === 4) {
            this.stepperTitle = 'Address';
            this.index = 3;
        }
    }
    GoBack() {
        this.location.back();
    }
    GoToTab(index: number) {
        this.index = index;
    }
}
