import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

import { Client } from '../client';
import { MainService } from '../main.service';

@Component({
  selector: 'app-client-data',
  templateUrl: './client-display.component.html',
  styleUrls: ['./client-display.component.css']
})
export class ClientDisplayComponent implements OnInit {

  clients: Client[]

  constructor(
    private cookieService: CookieService,
    private mainService: MainService) { }

  ngOnInit(): void {
    // Get current user's id and get their clients
    let current_uid = this.cookieService.get('current_user')
    this.getClients(current_uid)

  }

  
  getClients(uid: string): void {
    this.mainService.getClients(uid).then((clients) => {
      console.log('Succesws');
      this.clients = clients;
    }).catch((err) => {
      console.log(err);
    });
  }

}
