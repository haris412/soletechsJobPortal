import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-notification-modal',
  templateUrl: './notification-modal.component.html',
  styleUrls: ['./notification-modal.component.scss']
})
export class NotificationModalComponent {

  constructor(private router:Router){}
  GoToJob(){
    this.router.navigate(['/applicant']);
  }
  GoToProfile(){
    this.router.navigate(['/user-profile']);
  }
  SeeAllNotification(){
    this.router.navigate(['/notifications']);
  }
}
