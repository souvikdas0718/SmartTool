import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import { UserRevenue } from '../userRevenue';
import { MainService } from '../main.service';
import { RevenueComponent } from '../revenueForm/revenueForm.component';
import {AlertModalComponent} from '../alert-modal/alert-modal.component';

@Component({
  selector: 'app-revenue-display',
  templateUrl: './revenue-display.component.html',
  styleUrls: ['./revenue-display.component.css']
})
export class RevenueDisplayComponent implements OnInit {

  edit_revenue: UserRevenue;
  revenue_reports: UserRevenue[];

  constructor(
    private cookieService: CookieService,
    private mainService: MainService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    // Get current user's id and get their revenue reports
    let current_uid = this.cookieService.get('current_user')
    this.getRevenue(current_uid)
  }

  /**
   * 
   * @param uid id of the current user
   */
  getRevenue(uid: string): void {
    this.mainService.getRevenue(uid).then((revenue) => {
      this.revenue_reports = revenue;
    }).catch((err) => {
      console.log(err);
    });
  }

  /**
   * 
   * @param revenue_id id of revenue report to remove
   */
  removeRevenue(revenue_id: string): void {
    this.mainService.removeRevenue(revenue_id).then(() => {

    }).catch((err) => {
      console.log(err);
    });
  }

  editRevenue(revenue_d: string, 
                date: Date,
                office_costs: number,
                wage_costs: number,
                marketing_costs: number,
                other_costs: number,
                operation_cost: number,
                revenue: number){

    if(this.edit_revenue.uid != "") {
      // Update revenue records on filled fields
      if(date.toString() != "") { this.edit_revenue.date = date; }
      if (office_costs > 0) { this.edit_revenue.office_costs = office_costs; }
      if (wage_costs > 0) { this.edit_revenue.wage_costs = wage_costs; }
      if (marketing_costs > 0) { this.edit_revenue.marketing_costs = marketing_costs; }
      if (other_costs > 0) { this.edit_revenue.other_costs = other_costs; }
      if (operation_cost > 0) { this.edit_revenue.operation_cost = operation_cost; }
      if (revenue > 0) { this.edit_revenue.revenue = revenue; }

      this.mainService.editRevenue(this.edit_revenue).then(() => {
        // Clear selected record for editing
        this.edit_revenue = new UserRevenue();

      }).catch((err) => {
        console.log(err);
      });
    } else {
      this.alertModal('Cannot find revenue record');
    }
  }

  /**
   * 
   * @param client 
   */
  openEditModal(revenue: UserRevenue, content) {
    this.edit_revenue = revenue;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  openNewClientModal() {
    const active_modal = this.modalService.open(RevenueComponent);
  }

  alertModal(msg) {
    const active_modal = this.modalService.open(AlertModalComponent);
    active_modal.componentInstance.setMsg(msg);
  }
}
