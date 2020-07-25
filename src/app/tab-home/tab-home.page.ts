import { Component, OnInit, ViewChild } from "@angular/core";
import { AuthenticationService } from "../services/authentication.service";
import { Router } from "@angular/router";
import { Chart } from 'chart.js';

@Component({
  selector: "app-tab-home",
  templateUrl: "./tab-home.page.html",
  styleUrls: ["./tab-home.page.scss"]
})
export class TabHomePage implements OnInit {
  constructor(private router: Router, private auth: AuthenticationService) {}



  @ViewChild('barChart', {static: false}) barChart;
  @ViewChild('pieChart', {static: false}) pieChart;

  bars: any;
  colorArray: any;

  ionViewDidEnter() {
    this.createBarChart();
    this.createPieChart();
  }

  createBarChart() {
    let ctx = this.barChart.nativeElement;
    ctx.height = 200;
    this.bars = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Lu', 'Ma', 'Me', 'Gi', 'Ve', 'Sa', 'Do'],
        datasets: [{
          label: 'Tickets chiusi questa settimana',
          data: [8, 6, 13, 8, 12, 2, 0],
          backgroundColor: '#04c582', // array should have same number of elements as number of dataset
          borderColor: '#04c582',// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
  
  createPieChart() {
    let ctx = this.pieChart.nativeElement;
    ctx.height = 200;
    this.bars = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Lu', 'Ma', 'Me', 'Gi'],
        datasets: [{
          label: 'Tickets chiusi questa settimana',
          data: [8, 6, 13, 8],
          backgroundColor: ['#04c582','#FF0000', '#00FF00', 'blue'], // array should have same number of elements as number of dataset
          borderColor: '#04c582',// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      },

    });
  }
  ngOnInit() {}

  // gotoDetail() {
  //   this.router.navigateByUrl("/members/tabs/tabHome/homeDetail");
  // }
}
