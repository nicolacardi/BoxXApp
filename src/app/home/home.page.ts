import { Component, ViewChild } from "@angular/core";
import { Chart } from 'chart.js';

//import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { todoEvent } from '../_models/models';
import { TicketService } from '../_services/ticket.service';
import { TodoEventsService } from '../_services/todoevents.service';

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})

//,public camera: Camera 
export class HomePage {
  constructor(
    private ticketService: TicketService,
    private todoEventsService: TodoEventsService
    ) {
      
  }

  @ViewChild('barChart', { static: false }) barChart;
  @ViewChild('pieChart', { static: false }) pieChart;

  bars: any;
  colorArray: any;

  public openTicket: number=0;
  public totTodo: number=0;
  public openTodo: number=0;
  

  ionViewDidEnter() {
    this.createBarChart();
    this.createPieChart();

    //Ticket
    this.openTicket=0;
    this.ticketService.getTicketList().subscribe(
      res   => {
        if ( res != [] && res != null  ) {
          this.openTicket= res.length;
        }
      }
    );
    //Todo
    this.totTodo=0;
    this.openTodo=0;
    this.todoEventsService.getTodoEventList().subscribe(
      res   => {
        
        if ( res != [] && res != null && res.length != 0) {
          this.totTodo= res.length;

          (res as []).forEach((todo: todoEvent) => {
            if(!todo.isClosed)
            this.openTodo++;
          });
        }
      }
    );
  }

  createBarChart() {
    const ctx = (<HTMLCanvasElement>this.barChart.nativeElement).getContext('2d');
    //const ctx = this.barChart.nativeElement;
    const barGradient = ctx.createLinearGradient(0, 0, 0, 200);
    barGradient.addColorStop(1, 'rgba(74, 167, 237, 0.1)');
    barGradient.addColorStop(0, 'rgba(74, 167, 237, 1)');

    const bar_chart = new Chart(ctx, {
      type: "bar",
      data: {

        labels: ["Lu", "Ma", "Me", "Gi", "Ve", "Sa", "Do"],
        datasets: [
          {
            label: "Ticket Chiusi",
            data: [12, 13, 9, 8, 5, 1, 2],
            backgroundColor: barGradient,
            hoverBackgroundColor: barGradient,
            hoverBorderWidth: 2,
            hoverBorderColor: "#214968",
            borderWidth: 1,
            borderColor: "#4aa7ed"
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            gridLines: {
              display: false
            }
          }]
        }
      }

      // let ctx = this.barChart.nativeElement;
      // //ctx.height = 180;
      // this.bars = new Chart(ctx, {
      //   type: 'bar',
      //   data: {
      //     labels: ['Lu', 'Ma', 'Me', 'Gi', 'Ve', 'Sa', 'Do'],
      //     datasets: [{
      //       label: 'Tickets chiusi questa settimana',
      //       data: [8, 6, 13, 8, 12, 2, 0],
      //       backgroundColor: this.bgColor, // array should have same number of elements as number of dataset
      //       borderColor: '#04c582',// array should have same number of elements as number of dataset
      //       borderWidth: 1
      //     }]
      //   },
      //   options: {
      //     scales: {
      //       yAxes: [{
      //         ticks: {
      //           beginAtZero: true
      //         }
      //       }]
      //     }
      //   }
      // });
    });
  }

  createPieChart() {

    const ctx = (<HTMLCanvasElement>this.pieChart.nativeElement).getContext('2d');
    //const ctx = this.barChart.nativeElement;
    const chunk1Gradient = ctx.createLinearGradient(0, 0, 0, 200);
    chunk1Gradient.addColorStop(1, 'rgba(74, 167, 237, 0.1)');
    chunk1Gradient.addColorStop(0, 'rgba(74, 167, 237, 1)');
    const chunk2Gradient = ctx.createLinearGradient(0, 0, 0, 200);
    chunk2Gradient.addColorStop(1, 'rgba(255, 90, 98, 0.1)');
    chunk2Gradient.addColorStop(0, 'rgba(255, 90, 98, 1)');
    const chunk3Gradient = ctx.createLinearGradient(0, 0, 0, 200);
    chunk3Gradient.addColorStop(1, 'rgba(165, 87, 255, 0.1)');
    chunk3Gradient.addColorStop(0, 'rgba(165, 87, 255, 1)');
    const chunkHoverGradient = ctx.createLinearGradient(0, 0, 0, 200);
    chunkHoverGradient.addColorStop(1, 'rgba(104, 104, 104, 0.1)');
    chunkHoverGradient.addColorStop(0, 'rgba(104, 104, 104, 1)');

    const bar_chart = new Chart(ctx, {
      type: "doughnut",
      data: {

        labels: ["Assistenza", "Installazione", "Revisione"],
        datasets: [
          {
            label: "Numero di Interventi",
            data: [12, 20,2],
            backgroundColor: [chunk1Gradient, chunk2Gradient, chunk3Gradient],
            //hoverBackgroundColor: chunkHoverGradient,
            hoverBorderWidth: 2,
            hoverBorderColor: "#214968",
            borderWidth: 0,
            borderColor: "#4aa7ed"
          }
        ]
      },
      options: {
        legend: {
          //display: false
          position: 'right'
        },
        scales: {
          xAxes: [{
            gridLines: {
              display: false
            },
            ticks: {
              display: false //this will remove only the label
          }
          }]
        }
      }
    });
  }
  //   let ctx = this.pieChart.nativeElement;
  //   //ctx.height = 180;
  //   this.bars = new Chart(ctx, {
  //     type: 'pie',
  //     data: {
  //       labels: ['Lu', 'Ma', 'Me', 'Gi'],
  //       datasets: [{
  //         label: 'Tickets chiusi questa settimana',
  //         data: [8, 6, 13, 8],
  //         backgroundColor: ['#04c582', '#FF0000', '#00FF00', 'blue'], // array should have same number of elements as number of dataset
  //         borderColor: '#04c582',// array should have same number of elements as number of dataset
  //         borderWidth: 1
  //       }]
  //     },

  //   });
  // }

  //#region Picture
  /* 
  public immagine: any;
  
  takePicture() {
    const options: CameraOptions = {
      quality: 70,
      //destinationType: this.camera.DestinationType.FILE_URI,    //PER JPG
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
     this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.immagine = 'data:image/jpeg;base64,' + imageData;
     }, (err) => {
      // Handle error
     });
  }
  */
  //#endregion


}
