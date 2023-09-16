import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetpasswordComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  PasswordReset(){
    this.router.navigate(['/reset-password']);
  }
  Back(){
    this.router.navigate(['/login']);
  }
}
