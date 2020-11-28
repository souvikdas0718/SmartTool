import { Component, OnInit, AfterViewInit, DoCheck } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-graph-analytics',
  templateUrl: './graph-analytics.component.html',
  styleUrls: ['./graph-analytics.component.css']
})
export class GraphAnalyticsComponent implements OnInit {

  constructor() { }
  lineGraph:any  = [];
  horizontalBar;
  stackedBar;
  intialdata = [10, 20, 5, 10, 2]; 
  ngOnInit(): void {
    this.lineGraph = new Chart('lineGraph',{
      type: 'line',
      data: {
        labels: ['January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December'],
        datasets: [
          {
            label: 'Profit Percent',
            data: [1, 2, -3, 2, 0, 5, 3, 4, -2, 1, 6, 1],
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

    })
    //Ending of line grah about blog writting analysis


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

    //Starting of Stacked bar about activity completion anaysis
    this.stackedBar = new Chart('stackedBar', {
      type: 'bar',
      data: {
        labels: ['amd',
          'rty',
          'Cisco',
          'ewra',
          'tre',
          'Facebook', 
          'Telus', 
          'ABB'
        ],
        datasets: [
          {
            label: " Sprint Deliveries completed",
            data: [10, 20, 5, 10, 2, 1, 12],
            backgroundColor: '#b2b2b2',
            hoverBorderColor: '#e6e6ff',
            hoverBorderWidth: 2,
          },
          {
            label: "Sprint Tasks in progress",
            data: [1, 20, 6, 10, 2, 6,0,10],
            backgroundColor: '#f4e1d2',
            hoverBorderColor: '#e6e6ff',
            hoverBorderWidth: 2,

          },
          {
            label: "Sprint Backlog",
            data: [1, 4, 6, 3, 2, 5,0, 1],
            backgroundColor: '#bc5a45',
            hoverBorderColor: '#80ced6',
            hoverBorderWidth: 2,

          }

        ]
      },
      options:
      {
        title:
        {
          fontSize: 15,
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
              stacked: true,
              ticks: {
                display: true,
                beginAtZero: true//this will remove only the label
              },
              gridLines: {
                display: false
              }
            }],
          yAxes: [{
            stacked: true,
            gridLines: {
              display: false
            }
          }]
        }
      }
    });
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
