import { Component } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { UserInfoService } from '../user-info.service';


@Component({
  selector: 'app-add-edit-basicinformation',
  templateUrl: './add-edit-basicinformation.component.html',
  styleUrls: ['./add-edit-basicinformation.component.scss']
})
export class AddEditBasicinformationComponent {
  public completed: boolean = true;
  public sidenavOpen: boolean = false;
  title = 'angular';
  public Editor = ClassicEditor;

  constructor(public userInfoService: UserInfoService) {
    
   }

  ngOnInit(): void {
  }

  OpenSidenav() {
    this.sidenavOpen = true;
    document.body.style.overflow = 'hidden';
  }

  CloseSidenav() {
    this.sidenavOpen = false;
    document.body.style.overflow = 'auto';
  }
}
