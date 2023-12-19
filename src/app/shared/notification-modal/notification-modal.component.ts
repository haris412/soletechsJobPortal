import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslationAlignmentService } from 'src/app/app-services/translation-alignment.service';


@Component({
  selector: 'app-notification-modal',
  templateUrl: './notification-modal.component.html',
  styleUrls: ['./notification-modal.component.scss']
})
export class NotificationModalComponent {
  public isNotificationPage: boolean = false;
  constructor(private router: Router,
    public translationService: TranslationAlignmentService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/notifications') {
          this.isNotificationPage = true;
        }
        else this.isNotificationPage = false;
      }

    }
    )
  }
  GoToJob() {
    this.router.navigate(['/applicant']);
  }
  GoToProfile() {
    this.router.navigate(['/user-profile']);
  }
  SeeAllNotification() {
    this.router.navigate(['/notifications']);
  }
}
