import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { ToastController, IonContent, IonToggle } from '@ionic/angular';

import { ticket, ticketDetail, ticketCausale } from '../../_models/models';
import { TicketService } from '../../_services/ticket.service';
import { TicketDetailService } from '../../_services/ticket-detail.service';
import { TicketCausaliService } from '../../_services/ticket-causali.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-details.page.html',
  styleUrls: ['../tickets.scss'],
})

export class TicketDetailsPage implements OnInit {

  @ViewChild('topPage', { static: false }) topPage: IonContent;

  @ViewChild ('toggleStato', {static: false}) togglestato: IonToggle;
  
  removedDetail:any;

  //Data di default impostata in testata (opzionale)  
  dtDefault: Date;

  public totCards: number;
  public Ore: number;
  public Minuti: number;
  public ticketClosed: boolean;

  
  constructor(private route: ActivatedRoute
    , private router: Router
    //, private fb: FormBuilder
    , public serviceTicket: TicketService
    , public serviceTicketDetails: TicketDetailService
    , public serviceTicketCausali: TicketCausaliService
    //, public toastController: ToastController
    , public alertController: AlertController) {

  }

  loading = true;

  public objTicket: ticket;
  ticketID: any;
  ticketDetails: ticketDetail[];
  ticketCausali: ticketCausale[];

  ngOnInit() {
    let totOre: number = 0;
    let totMinuti: number = 0;
    this.totCards = 0;

    //init oggetto [ticket]
    if (this.objTicket == null) {
      this.objTicket = {
        id: 0,
        n_Ticket: null,
        tipoTicket: null,
        statoTicket: null,
        data1: null,

        badge: null,
        customerID: 0,
        customer: null,
        poi: null
      }
    }

    this.ticketID = this.route.snapshot.params['id'];

    //console.log("TicketID: ", this.ticketID);

    /* 3 CALL ASINCRONE: poteva capitare che la seconda arrivasse prima della prima e quindi i ticket non avessero la causale
    this.serviceTicketCausali.getCausaliList()
      .subscribe(
        res => {
          this.ticketCausali = res as ticketCausale[];
        }
    );
  
    this.serviceTicketDetails.getTicketDetailList(this.ticketID)
      .subscribe(
        res => {
          this.ticketDetails = res as ticketDetail[];
        }
      );
    //this.ticketDetailsForms.clear();
    this.serviceTicketDetails.getTicketDetailList(this.ticketID).subscribe(
      res => {

        console.log("Ticket details caricati");

        if (res == [] || res == null || res.length == 0) {
          this.addTicketDetailForm();
          this.loading = false;
        } else {
          (res as []).forEach((detail: ticketDetail) => {
            this.totCards++;
            let diffInMs: number = Date.parse(detail.h_End.toString()) - Date.parse(detail.h_Ini.toString())
            var mins = Math.floor(diffInMs / 60000);
            totMinuti += mins;
          });
          this.Minuti = totMinuti % 60;
          this.Ore = Math.floor(totMinuti / 60) % 24;
          this.loading = false;
        }
      }
    );
    */
    this.serviceTicketCausali.getCausaliList().subscribe(
      res => {
        this.ticketCausali = res as ticketCausale[];

        this.serviceTicket.getTicket(this.ticketID).subscribe(
          res => {
            this.objTicket = res as ticket;
            if (this.objTicket.statoTicket == '90' ) 
              this.ticketClosed = true ;
          }
        );

        this.serviceTicketDetails.getTicketDetailList(this.ticketID).subscribe(
          res => {
            this.ticketDetails = res as ticketDetail[];

            if (res == [] || res == null || res.length == 0) {
              this.addTicketDetailForm();
              this.loading = false;
            } 
            else {
                //sort per far comparire i todo chiusi sotto, ordinati per data
                //res.sort((a, b) => new Date(b.dt).getTime() - new Date(a.dt).getTime())
                //  .sort((a, b) => a.isClosed < b.isClosed ? -1 : a.isClosed > b.isClosed ? 1 : 0);
                
                (res as []).forEach((detail: ticketDetail) => {
                  this.totCards++;
                  let diffInMs: number = Date.parse(detail.h_End.toString()) - Date.parse(detail.h_Ini.toString())
                  var mins = Math.floor(diffInMs / 60000);
                  totMinuti += mins;
                });
                this.Minuti = totMinuti % 60;
                this.Ore = Math.floor(totMinuti / 60) % 24;
                this.loading = false;
              }
            }
        );
      }
    );
  }

  addTicketDetailForm() {
    //this.ticketDetails.push({ id:null, ticketID: this.objTicket.id, causaleID:null, causale: null, dt:this.objTicket.data1, h_Ini:null , h_End:null, note: ''});
    this.ticketDetails.unshift({ id: null, ticketID: this.objTicket.id, causaleID: null, causale: null, dt: this.objTicket.data1, h_Ini: null, h_End: null, note: '' });
    this.topPage.scrollToTop();
  }

  removedDetailCard(id){ 
    let j=0;
    this.ticketDetails.forEach(element => {
     console.log("i=", id , "  element.id=", element.id);
     if(element.id == id){
       this.ticketDetails.splice(j,1);
     }
     j++;
   }); 
  }

  async ConfirmTicket(){

    let fd =  {
      'id': this.objTicket.id,
      'ticketID': this.objTicket.n_Ticket,
      'tipoTicket': this.objTicket.tipoTicket,
      'statoTicket': this.objTicket.statoTicket,
      'badge': this.objTicket.badge,
      'data1': this.objTicket.data1,
      'customerID': this.objTicket.customerID,
      'customer': this.objTicket.customer,
      'poi': this.objTicket.poi
    };
  
    const alert = await this.alertController.create({
      header: 'CHIUSURA TICKET',
      message: 'Si desidera chiudere il ticket ?<br/>(operazione irreversibile)',
      buttons: [
        {
          text: 'NO',
          role: 'cancel',
          handler: () => {
            this.togglestato.checked = false;

          }
        },
        {
          text: 'CHIUDI IL TICKET',
          
          handler: () => {
            this.serviceTicket.confirmTicket(fd)
              .subscribe(
              res=>{
                this.router.navigateByUrl('/tickets-list');
                this.ticketClosed = true;
              },
              err=>{
                console.log('ERRORE IN CHIUSURA');
              }
            )
          }
        }
      ]
    });
    await alert.present();
  }

  showSignature() {
    this.router.navigateByUrl('/signature/'+  this.ticketID);
  }
  showPhotoGallery() {
    this.router.navigateByUrl('/photo-gallery/'+  this.ticketID);
  }
}
