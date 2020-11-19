import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import { MainService } from '../main.service';
import { AlertModalComponent } from '../alert-modal/alert-modal.component'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private mainService: MainService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  /**
   * Logs user into application
   * @param email    Email address for login creds
   * @param password Password for login creds
   */
  login(email: string, password: string): void {

    // Ensuring forms are filled
    if(email != '' && password != '') {
      this.mainService.login(email, password).then((uid) => {
        // TODO: route to main page
        this.alertModal("Success: " + uid);
      }).catch((err) => {
        this.alertModal(err.message);
      });
      
    } else {
      this.alertModal("Ensure all fields are filled out.");
    }
  };

  alertModal(msg) {
    const active_modal = this.modalService.open(AlertModalComponent);
    active_modal.componentInstance.setMsg(msg);
  }

}
