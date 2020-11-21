import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { MainService } from '../main.service';
import { AlertModalComponent } from '../alert-modal/alert-modal.component'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(
    private mainService: MainService,
    private modalService: NgbModal,
    private router: Router,
    private cookieService: CookieService) { }

  ngOnInit(): void {
  }

  /**
  *
  * Creates firebase auth-user record and firestore user record
  * @param user_name      Name of company user
  * @param email          Email address for login creds
  * @param conf_email     Confirmation field
  * @param password       Password for login creds
  * @param password_email Confirmation field
  * @param avg_wage       Average of monthly wage costs per employee in company
  * @param num_employees  Number of employees working for company
  * 
  */
  signUp(user_name: string,
          email: string,
          conf_email: string,
          password: string,
          conf_password: string,
          avg_wage: number,
          num_employees: number): void {
    
    // Ensure form is complete & emails, passwords are confirmed       
    if(email != '' && conf_email != '' && password != '' && conf_password != '' && avg_wage > 0  && num_employees > 0) {
      if(email == conf_email) { 
        if(password == conf_password) {

          this.mainService.createUser(user_name, email, password, avg_wage, num_employees).then((uid) => {         
            this.cookieService.set('current_user', uid)
            this.router.navigate(['/']);
    
          }).catch((err) => {
            this.alertModal(err.message);
          });

        } else { this.alertModal("Ensure passwords match."); }
      } else { this.alertModal("Ensure email addresses match."); }
    } else { this.alertModal("Ensure all fields are filled out."); }
  }

  alertModal(msg) {
    const active_modal = this.modalService.open(AlertModalComponent);
    active_modal.componentInstance.setMsg(msg);
  }

}
