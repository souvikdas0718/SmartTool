import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Team8SmartTool';

  constructor(private router: Router,
              private cookieService: CookieService) {}

  ngOnInit() {

    // Ensures user is logged in
    // TODO: May check for login from user-auth & firestore records
    let current_uid = this.cookieService.get('current_user');
    if(current_uid == "") {
      this.router.navigate(['/login']);
    }
  }
}
