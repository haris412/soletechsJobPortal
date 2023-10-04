import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-linkedIn-redirect',
  templateUrl: './linkedIn-redirect.component.html',
  styleUrls: ['./linkedIn-redirect.component.scss']
})
export class LinkedInRedirectComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
}
