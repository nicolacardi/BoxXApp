import { Component, OnInit, ViewChild } from '@angular/core';

import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { SignaturePadModule } from 'angular2-signaturepad';

import { Platform } from '@ionic/angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { ActivatedRoute } from '@angular/router';
import { TicketService } from '../_services/ticket.service';
import { ticket } from '../_models/models';


@Component({
  selector: 'app-signature',
  templateUrl: './signature.page.html',
  styleUrls: ['./signature.page.scss'],
})

export class SignaturePage implements OnInit {

  signature = '';
  isDrawing = false;
  ticketID: string;
  public objTicket: ticket;

  @ViewChild(SignaturePad,{static: false}) signaturePad: SignaturePad;
  public signaturePadOptions: Object;
  
  constructor(platform: Platform
    , private screenOrientation: ScreenOrientation
    , public route: ActivatedRoute
    , public serviceTicket: TicketService) { 


    // set to landscape
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);

    this.objTicket = {
      id: 0,
      n_Ticket: "xxxxx",
      tipoTicket: null,
      statoTicket: null,
      data1: null,

      badge: null,
      customerID: 0,
      customer: {

      id: 0,
      codice: null,
      ragsoc: "yyyy",
      indirizzo: null,
      citta: null,
      prov: null,
      nazione: null,
      poi: null
      },
      poi: null
    }

    this.ticketID = this.route.snapshot.params['ticketId'];
    if (this.ticketID != '0') {
      this.serviceTicket.getTicket(this.ticketID)
      .subscribe(
        res => {
          this.objTicket = res as ticket;
        },
        err => {
          this.objTicket = {
            id: 0,
            n_Ticket: "errore",
            tipoTicket: null,
            statoTicket: null,
            data1: null,
    
            badge: null,
            customerID: 0,
            customer: null,
            poi: null
          }
        }
      );
    }


    this.signaturePadOptions = { 
      'minWidth': 2,
      'canvasWidth': platform.width() - platform.width() * 0.05, //400
      'canvasHeight': platform.height() -  platform.height() * 0.2 , //200
      'backgroundColor': 'transparent',
      'penColor': 'black'
    };

  }

  ngOnInit() {
  
  }

 

  ionViewDidEnter() {
    this.signaturePad.clear();

    //this.storage.get('savedSignature').then((data) => {
    //  this.signature = data;
    //});
  }

  drawComplete() {
    this.isDrawing = false;
  }
 
  drawStart() {
    this.isDrawing = true;
  }
  clearPad() {
    this.signaturePad.clear();
  }

  savePad() {
    this.signature = this.signaturePad.toDataURL();
    console.log("savePad: " , this.signature);

    //this.storage.set('savedSignature', this.signature);
    this.signaturePad.clear();
    //let toast = this.toastCtrl.create({
    //  message: 'New Signature saved.',
    //  duration: 3000
    //});
    //toast.present();
  }

}
