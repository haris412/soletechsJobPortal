import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss']
})
export class LeftMenuComponent {
  public isBasicInfo: boolean = true;
  public notifications: boolean = false;
  public deactivate: boolean = false;
  @Input() isTranslate: boolean = false;
  @Output() scrollTo = new EventEmitter<string>();

  ScrolltoTarget(event: any) {
    this.scrollTo.emit(event);
    switch (event) {
      case '#basicInformation': {
        this.isBasicInfo = true;
        this.notifications = false;
        this.deactivate = false;
        break;
      }
      case '#notifications': {
        this.isBasicInfo = false;
        this.notifications = true;
        this.deactivate = false;
        break;
      }
      case '#deactivate': {
        this.isBasicInfo = false;
        this.notifications = false;
        this.deactivate = true;
        break;
      }
    }
  }
}
