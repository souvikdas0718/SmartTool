import { Component, OnInit } from '@angular/core';

import { Client } from '../client';

@Component({
  selector: 'app-client-data',
  templateUrl: './client-display.component.html',
  styleUrls: ['./client-display.component.css']
})
export class ClientDisplayComponent implements OnInit {

  clients: Client[]

  constructor() { }

  ngOnInit(): void {
  }

}
