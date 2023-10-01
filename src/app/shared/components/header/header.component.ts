import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationModalComponentService } from '../../notification-modal/notification-modal.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router:Router,
    private notification: NotificationModalComponentService
    ) { }

  ngOnInit(): void {
  }

  Login(){
    this.router.navigate(['/login']);
  }

  OpenNotificationModal() {
    const dialogRef = this.notification.openDialog('');
  }
}
