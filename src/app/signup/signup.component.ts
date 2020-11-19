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

  signUp(user_name: string,
          email: string,
          conf_email: string,
          password: string,
          conf_password: string,
          avg_wage: number,
          num_employees: number): void {

    // Ensure emails and passwords are confirmed
    if(email == conf_email) {
      if(password == conf_password) {

        console.log("TEST")

      } else {
        // TODO: ERROR password dont match
        console.log("FAIL")
      }

    } else {
      // TODO: ERROR email dont match
      console.log("FAIL")
    }

  }

}
