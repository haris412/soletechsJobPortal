import { Component } from '@angular/core';
import { Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
  public completed: boolean = true;
	public sidenavOpen: boolean = false;
	title = 'angular';
	public Editor = ClassicEditor;
	index: Number = 1;
	fileData: any;
    imageAvatar:any;
	defaultUrl:string = 'assets/Images/Profile.png';
	fileList:any[] = [];
	constructor(private router: Router) { }

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
	Back(index: Number) {

	}
	RouteToProfile() {
		this.router.navigate(['/profile']);
	}
	RouteToCompetencies() {
		this.router.navigate(['/competencies']);
	}
	selectFile(event:any){
	if (this.fileData.type == 'image/jpeg' || this.fileData.type == 'image/png') {
		this.fileData = event.target.files[0];
		const reader = new FileReader();
		reader.readAsDataURL(this.fileData);
		reader.onload = () => {
		this.imageAvatar = reader.result;
		};
	} else {
		alert("file type should be image of jpeg or png")
		return;
	}
 }
	DeleteFile(file:any){

	}
}
