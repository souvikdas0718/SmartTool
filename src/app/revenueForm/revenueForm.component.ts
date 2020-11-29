import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

import {MainService} from '../main.service';
import {AlertModalComponent} from '../alert-modal/alert-modal.component'
import { UserRevenue } from '../userRevenue';

@Component({
  selector: 'app-revenueForm',
  templateUrl: './revenueForm.component.html',
  styleUrls: ['./revenueForm.component.css']
})
export class RevenueComponent implements OnInit {

  constructor(
    private mainService: MainService,
    private modalService: NgbModal,
    private router: Router,
    private cookieService: CookieService) {
  }

  ngOnInit(): void {
  }

  
  createRevenue(
    date: string,
    office_costs: number,
    wage_costs: number,
    marketing_costs: number,
    other_costs: number,
    operation_costs: number,
    revenue: number): void {

    // Ensure form is complete & emails, passwords are confirmed
    if (date != '' && office_costs > 0 && wage_costs > 0 && marketing_costs > 0 && other_costs > 0 && operation_costs > 0 && revenue > 0) {

      this.mainService.createRevenue(date, office_costs, wage_costs, marketing_costs, other_costs, operation_costs, revenue).then(() => {
        this.modalService.dismissAll();      
        window.location.reload();  

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
