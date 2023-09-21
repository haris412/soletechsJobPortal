import { Component, OnInit } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
    selector: 'app-user-info',
    templateUrl: './user-info.component.html',
    styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

    public completed: boolean = true;
    public sidenavOpen: boolean = false;
    title = 'angular';
    public Editor = ClassicEditor;
    index:Number = 1;
    constructor() { }

    ngOnInit(): void {
    }

    OpenSidenav() {
        this.sidenavOpen = true;
    }

    CloseSidenav() {
        this.sidenavOpen = false;
    }

    Next(){
        if (this.index === 1) {
            this.index = 2;
        } else if (this.index === 2) {
            this.index = 3;
        } else if (this.index === 3) {
            this.index = 4;
        } else if (this.index === 4) {
            this.index = 5;
        } else if (this.index === 5) {
            this.index = 6;
        }
    }
    Back(index:Number){

    }
}