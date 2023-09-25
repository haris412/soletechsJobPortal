import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quick-apply',
  templateUrl: './quick-apply.component.html',
  styleUrls: ['./quick-apply.component.scss']
})
export class QuickApplyComponent {
  public isFile: boolean = false;
  constructor(
    private router: Router
  ) {}

  Back() {
    this.router.navigate(['/'])
  }
}
