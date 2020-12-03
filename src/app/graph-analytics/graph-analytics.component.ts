import { Component, OnInit, DoCheck } from '@angular/core';
import { Chart } from 'chart.js';

import {MainService} from '../main.service';

@Component({
  selector: 'app-graph-analytics',
  templateUrl: './graph-analytics.component.html',
  styleUrls: ['./graph-analytics.component.css']
})
export class GraphAnalyticsComponent implements OnInit, DoCheck {

  profitPlot:any = [];
  profit_data = [];
  updated_profit_plot = false;

  revCostPlot:any = [];
  rev_data = [];
  costs_data = [];
  updated_rev_plot = false;
  updated_costs_plot = false;

  costsBreakdownPlot:any = [];
  costs_breakdown_data = [];
  updated_breakdown_plot = false;

  clientsPlot:any = [];
  clients_data = [];
  updated_clients_plot = false;

  horizontalBar;
  stackedBar;

  constructor(private mainService: MainService) { }

  // Check for plotting data here and update graphs
  ngDoCheck(): void {
    
    // populating profits chart
    if(this.profit_data.length > 0 && !this.updated_profit_plot) {
      this.profitPlot.data.labels = this.profit_data[0];
      this.profitPlot.data.datasets[0].data = this.profit_data[1];
      this.profitPlot.update();
      this.updated_profit_plot = true;
    }

    // populating rev / cost chart w/ revenue and labels
    if(this.rev_data.length > 0 && !this.updated_rev_plot) {
      this.revCostPlot.data.labels = this.rev_data[0];
      this.revCostPlot.data.datasets[1].data = this.rev_data[1];
      this.revCostPlot.update();
      this.updated_rev_plot = true;
    }

    // populating rev / cost chart w/ costs
    if(this.costs_data.length > 0 && !this.updated_costs_plot) {
      this.revCostPlot.data.datasets[0].data = this.costs_data[1];
      this.revCostPlot.update();
      this.updated_costs_plot = true;
    }

    // populatiing costs breakdown chart
    if(this.costs_breakdown_data.length > 0 && !this.updated_breakdown_plot) {
      this.costsBreakdownPlot.data.labels = this.costs_breakdown_data[0];
      this.costsBreakdownPlot.data.datasets[0].data  = this.costs_breakdown_data[1];
      this.costsBreakdownPlot.update();
      this.updated_breakdown_plot = true;
    }

    if(this.clients_data.length > 0 && !this.updated_clients_plot) {
      this.clientsPlot.data.labels = this.clients_data[0];
      this.clientsPlot.data.datasets[0].data = this.clients_data[1];
      this.clientsPlot.update();
      this.updated_clients_plot = true;
    }
  }

  ngOnInit(): void {
    
    // Retrieving chart data
    this.mainService.getProfitPerMonth().then((profit_records) => { this.profit_data = profit_records; });
    this.mainService.getRevenuePerMonth().then((rev_records) => { this.rev_data = rev_records; });
    this.mainService.getCostsPerMonth().then((cost_records) => { this.costs_data = cost_records; });
    this.mainService.getCostsBreakdown().then((costs_breakdown) => {this.costs_breakdown_data = costs_breakdown; });
    this.mainService.getClientsPerMonth().then((clients) => {this.clients_data = clients; });

    this.profitPlot = new Chart('profitPlot',{
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Profit',
            data: [],
            backgroundColor: '#fee3b8',
            fill: true,
          },

        ]
      },
      options:
      {
        title:
        {
          display: true,
          text: ''
        },
        legend:
        {
          display: false,
          position: 'right'
        },
        animation: {
          animateScale: true,
          animateRotate: true
        },

        scales: {
          xAxes: [
            {

              ticks: {
                display: true,
                beginAtZero: true//this will remove only the label
              },
              gridLines: {
                display: false
              }
            }],
          yAxes: [{
            gridLines: {
              display: true
            }
          }]
        }
      }
    });

    this.revCostPlot = new Chart('revCostPlot',{
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Costs',
            data: [],
            backgroundColor: '#ed382b',
            fill: true,
          },{
            label: 'Revenue',
            data: [],
            backgroundColor: '#29db0e',
            fill: true,
          }
        ]
      },
      options:
      {
        title:
        {
          display: true,
          text: ''
        },
        legend:
        {
          display: false,
          position: 'right'
        },
        animation: {
          animateScale: true,
          animateRotate: true
        },

        scales: {
          xAxes: [
            {

              ticks: {
                display: true,
                beginAtZero: true//this will remove only the label
              },
              gridLines: {
                display: false
              }
            }],
          yAxes: [{
            gridLines: {
              display: true
            }
          }]
        }
      }
    });

    this.costsBreakdownPlot = new Chart('costsBreakdown', {
      type: 'pie',
      data: {
        labels: [],
        datasets: [{
            data: [],
            backgroundColor: ['#9013fe', '#0088ff', '#29db0e', '#f8e82c', '#ed382b'],
            hoverBorderColor: '#e6e6ff',
            hoverBorderWidth: 2}]
      }
    });

    this.clientsPlot = new Chart('clients', {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: 'Clients',
            data: [],
            backgroundColor: '#fee3b8',
            fill: true,
        }]
      },
      options:
      {
        title:
        {
          display: true,
          text: ''
        },
        legend:
        {
          display: false,
          position: 'right'
        },
        animation: {
          animateScale: true,
          animateRotate: true
        },

        scales: {
          xAxes: [
            {

              ticks: {
                display: true,
                beginAtZero: true//this will remove only the label
              },
              gridLines: {
                display: false
              }
            }],
          yAxes: [{
            gridLines: {
              display: true
            }
          }]
        }
      }
    });

    //Starting of horizontal bar about job stage analysis
    this.horizontalBar = new Chart('horizontalBar', {
      type: 'horizontalBar',
      data: {
        labels: ['Java', 'Angular', 'PowerBI', 'Salesforce', 'AWS'],
        datasets: [
          {
            data: [10, 20, 5, 10, 2],
            backgroundColor: ['#9013fe', '#0088ff', '#29db0e', '#f8e82c', '#ed382b'],
            hoverBorderColor: '#e6e6ff',
            hoverBorderWidth: 2,

          }
        ]
      },
      options:
      {
        title:
        {
          fontSize: 12,
          display: true,
          text: ''
        },
        legend:
        {
          display: false,
          position: 'right'
        },
        animation: {
          animateScale: true,
          animateRotate: true
        },
        scales: {
          xAxes: [
            {

              ticks: {
                display: false,
                beginAtZero: true//this will remove only the label
              },
              gridLines: {
                display: false
              }
            }],
          yAxes: [{
            gridLines: {
              display: false
            }
          }]
        }
      }
    })
    //Ending of horizontal bar about job stage analysis
  }

  applyDateFilter(value){
    if(value==2){
      this.horizontalBar.datasets[0].data = [1,1,5,1,2];
      this.horizontalBar.options.title.text = "Last month";
    }
    if (value == 3) {
      this.horizontalBar.data.datasets[0].data = [5, 2, 2, 1, 4];
      this.horizontalBar.options.title.text = "Past three months";
    }
    if (value == 4) {
      this.horizontalBar.data.datasets[0].data = [100, 60, 30, 80, 19];
      this.horizontalBar.options.title.text = "Half year(6 month)";
    }
    console.log(value)
    this.horizontalBar.update();

  }
}
