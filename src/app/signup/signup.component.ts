import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor() { }

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

          console.log("form good")
          

      } else {
        // TODO: ERROR password dont match
          console.log("pass dont match")
      }

    } else {
      // TODO: ERROR email dont match
        console.log("email dont match")
      }
    } else {
      // TODO: ERROR form not filled
      console.log("form not filled")
    }
  }
}
