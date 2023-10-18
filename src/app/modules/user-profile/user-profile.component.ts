import { ChangeDetectorRef, Component, ElementRef, Renderer2 } from '@angular/core';
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
    imageAvatar:any;
	defaultUrl:string = 'assets/Images/Profile.png';
	fileList:any[] = [];
	constructor(
		private router: Router, 
		public ref: ChangeDetectorRef,
		private renderer: Renderer2, 
		private el: ElementRef) { }

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
	selectFile(event:any) {
		const reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
      	reader.onload = (event) => {
        	this.imageAvatar = event?.target?.result;
		}
 	}

	DeleteFile(file:any) {
		this.fileList = [];
	}

	removeAvtar() {
		this.imageAvatar = this.defaultUrl;
	}

	uploadCV(files: any) {
		this.fileList.push(files.target.files[0]);
		this.ref.detectChanges();
	}
	ScrollToTarget(event: any) {
    const targetElement = this.el.nativeElement.querySelector(event);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
