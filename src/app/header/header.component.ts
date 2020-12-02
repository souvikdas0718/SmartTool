import { Component, OnInit, DoCheck } from '@angular/core';
import {Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, DoCheck {

  loggedIn: boolean;

  constructor(
    private router: Router,
    private cookieService: CookieService) { }

  // Hiding access to full nav-bar if logged out
  ngDoCheck(): void {
    var current_uid = this.cookieService.get('current_user');
    if(current_uid == "") {
      this.loggedIn = false;
    } else {
      this.loggedIn = true;
    }
  }

  ngOnInit(): void {
    this.loggedIn = false;
  }

  logout() {
    this.cookieService.set('current_user', "");
    this.router.navigate(['/login']);
  }
}
