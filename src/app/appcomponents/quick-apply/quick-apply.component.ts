import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quick-apply',
  templateUrl: './quick-apply.component.html',
  styleUrls: ['./quick-apply.component.scss']
})
export class QuickApplyComponent {
  public isFile: boolean = false;
  public files: any[] = [];
  constructor(
    private router: Router
  ) {}

  Back() {
    this.router.navigate(['/'])
  }

  onFileUpload(files: any) {
    this.files = files.target.files;
  }

  deleteFile() {
    this.files = [];
  }
}
