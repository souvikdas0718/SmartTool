import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import { Client } from '../client';
import { MainService } from '../main.service';
import { ClientFormComponent } from '../client-form/client-form.component';
import {AlertModalComponent} from '../alert-modal/alert-modal.component';

@Component({
  selector: 'app-client-data',
  templateUrl: './client-display.component.html',
  styleUrls: ['./client-display.component.css']
})
export class ClientDisplayComponent implements OnInit {

  edit_client: Client;
  clients: Client[];

  constructor(
    private cookieService: CookieService,
    private mainService: MainService,
    private modalService: NgbModal,) { }

  ngOnInit(): void {
    // Get current user's id and get their clients
    let current_uid = this.cookieService.get('current_user')
    this.getClients(current_uid)

  }

  /**
   * 
   * @param uid id of the current user
   */
  getClients(uid: string): void {
    this.mainService.getClients(uid).then((clients) => {
      this.clients = clients;
    }).catch((err) => {
      console.log(err);
    });
  }

  /**
   * 
   * @param client_id client id to be removed
   */
  removeClient(client_id: string): void {
    this.mainService.removeClient(client_id).then((clients) => {

      window.location.reload();  

    }).catch((err) => {
      console.log(err);
    });
  }

  editClient(client_name: string, start_date: Date, end_date: Date, revenue: number): void {
    if(this.edit_client.client_id != "") {
      // Update client records on filled fields
      if(client_name != "") { this.edit_client.client_name = client_name; }
      if(start_date.toString() != "") { this.edit_client.start_date = start_date; }
      if(end_date.toString() != "") { this.edit_client.end_date = end_date; }
      if(revenue > 0) { this.edit_client.revenue = revenue; }

      this.mainService.editClient(this.edit_client).then(() => {
        // Clear selected client for editing
        this.edit_client = new Client();

      }).catch((err) => {
        console.log(err);
      });

    } else {
      // TODO: alert modal
      this.alertModal('Cannot find client record')
    }
  }

  /**
   * 
   * @param client 
   */
  openEditModal(client: Client, content) {
    this.edit_client = client;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  openNewClientModal() {
    const active_modal = this.modalService.open(ClientFormComponent);
  }

  alertModal(msg) {
    const active_modal = this.modalService.open(AlertModalComponent);
    active_modal.componentInstance.setMsg(msg);
  }
}
