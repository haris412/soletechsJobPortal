import { Component, ElementRef, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { routeTransition } from './app-animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeTransition],
})
export class AppComponent implements OnInit {
  title = 'soletechsJobPortal';
  currentRoute: string = '';
  loginURLs = ['/login', '/forgot-password', '/reset-password', '/reset-password-success'];
  public isPositionAbsolute: boolean = false;
  public o:any;
  constructor(
    private router: Router,
    private el: ElementRef, 
    private renderer: Renderer2
  ) {

  }
  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
        if (this.currentRoute == '/login' || this.currentRoute == '/forgot-password' || this.currentRoute == '/reset-password' || this.currentRoute == '/reset-password-success') {
          this.isPositionAbsolute = false;
        }
        else this.isPositionAbsolute = true;
      }
    });
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/']);
    }
    this.changePrimaryColor('#005a9c');
  }
  getState(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData;
  }
  changePrimaryColor(newColor: string) {
    const root = this.el.nativeElement.ownerDocument.documentElement;
    console.log(this.renderer.setStyle(root, '--theme-color', newColor));
  }
}
