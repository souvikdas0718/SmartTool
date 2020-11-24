import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';

import {MainService} from '../main.service';
import {AlertModalComponent} from '../alert-modal/alert-modal.component';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit {

  constructor(
    private mainService: MainService,
    private modalService: NgbModal,
    private router: Router) { }

  ngOnInit(): void {
  }

  /**
   * Adds client record under current user 
   * @param client_name name of the client
   * @param start_date  start date of the client's contract
   * @param end_date    end date of the client's contract
   * @param revenue     total revenue attributed with new client contract
   */
  addClient(
    client_name: string,
    start_date: Date,
    end_date: Date,
    revenue: number): void {

      if(client_name != '' && start_date != null && end_date != null && revenue > 0){
        this.mainService.addClient(client_name, start_date, end_date, revenue).then(() => {

          this.modalService.dismissAll();

        }).catch((err) => {
          this.alertModal(err.message);
        });
      } else {
        this.alertModal("Ensure all fields are filled out.");
      }
  }

  alertModal(msg) {
    const active_modal = this.modalService.open(AlertModalComponent);
    active_modal.componentInstance.setMsg(msg);
  }

}
