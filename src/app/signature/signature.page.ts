import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Platform, ToastController } from '@ionic/angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { SignaturePadModule } from 'angular2-signaturepad';

import { TicketService } from '../_services/ticket.service';
import { TicketSignaturesService } from '../_services/ticket-signatures.service';
import { ticket, ticketSignature } from '../_models/models';


@Component({
  selector: 'app-signature',
  templateUrl: './signature.page.html',
  styleUrls: ['./signature.page.scss'],
})

export class SignaturePage implements OnInit {

  //signatureID: number;
  ticketID: number;
  tickets: ticket[];

  public objTicket: ticket;
  public objSignature: ticketSignature;
  //detailForm: FormGroup;
  
  signatureASCII = '';
  isDrawing = false;
  isMissingTicket = false;

  size1 : number;
  size2 : number;

  @ViewChild(SignaturePad,{static: false}) signaturePad: SignaturePad;
  public signaturePadOptions: Object;
  
  constructor( private platform: Platform
    , private screenOrientation: ScreenOrientation
    , public route: ActivatedRoute
    , public ticketService: TicketService
    , public signatureService: TicketSignaturesService
    , public toastController: ToastController
    ) { 

    // set to landscape (solo se su device)
    if(this.platform.is('cordova')){
      this.platform.ready().then(()=>{
        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
      })
    };

    this.ticketID = this.route.snapshot.params['ticketId'];

    if(this.ticketID <=0) {
      this.isMissingTicket = true;

      this.ticketService.getTicketList()
      .subscribe(
        res=>   { 
          this.tickets = res as ticket[];
          res.sort((a, b) =>a.n_Ticket < b.n_Ticket ? -1: 1);
       }
      );
    }

    //Carico l'oggetto Ticket (inizializzandolo)
    this.objTicket = {
      id: 0,
      n_Ticket: null,
      tipoTicket: null,
      statoTicket: null,
      data1: null,
      badge: null,
      customerID: 0,
      customer: {

      id: 0,
      codice: null,
      ragsoc: null,
      indirizzo: null,
      citta: null,
      prov: null,
      nazione: null,
      poi: null
      },
      poi: null
    }
    this.objSignature = {
      id: 0,
      ticketID: 0,
      signature:null,
      dtIns: null
    }
    
    if (this.ticketID > 0) {

      this.ticketService.getTicket(this.ticketID.toString())
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

      //Carico l'oggetto Signature
      this.signatureService.getSignatureByTicketID(this.ticketID)
      .subscribe(
        res=> {
          this.objSignature = res as ticketSignature;
          this.signaturePad.fromDataURL(this.objSignature.signature);
          //console.log("Firma trovata: ", this.objSignature.id);
        },
        err => {
          //console.log("Errore Firma: ", err);
          this.objSignature = {
            id: 0,
            ticketID: this.ticketID,
            signature: null,
            dtIns: null
          }
        }
      )
    };

    this.size1 = platform.width();
    this.size2 = platform.height();
    let setwidth = Math.max(this.size1,this.size2);
    let setheight = Math.min(this.size1, this.size2);
    // alert("w"+setwidth);
    // alert("h"+setheight);
    this.signaturePadOptions = { 
      'minWidth': 2,
      'canvasWidth': setwidth - setwidth * 0.05, //400
      'canvasHeight': setheight -  setheight * 0.38 , //200
      'backgroundColor': 'transparent',
      'penColor': 'black'
    };

  }

  ngOnInit() {

  }

 

  ionViewDidEnter() {
    //this.signaturePad.clear();
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

  saveSignature() {

    if(this.ticketID <=0){
      this.ShowMessage("Ticket non selezionato, impossibile salvare",'danger');
      return;
    }
    this.signatureASCII = this.signaturePad.toDataURL();

    //console.log("saveSignature: " , this.signatureASCII);
    //console.log("objSignature: " , this.objSignature);

    this.signatureService.InitFormData();
    if(this.objSignature.id > 0)
      this.UpdateRecord(this.signatureASCII);
    else
      this.InsertRecord(this.signatureASCII);
    
    //this.signaturePad.clear();
  }

  InsertRecord(sign: string){

    //console.log("SIGN INSERT");

    this.signatureService.formData.ticketID = this.ticketID;
    this.signatureService.formData.signature = sign;
    this.signatureService.formData.dtIns = new Date();

    this.signatureService.postSignature().subscribe(
      res => {
        this.ShowMessage("Firma registrata");
      },
      err => {
        //console.log(err);
        this.ShowMessage("Errore nel salvataggio",'danger');
       }
    )
  }
  
  UpdateRecord(sign: string){

    this.signatureService.formData.id = this.objSignature.id;
    this.signatureService.formData.ticketID = this.objSignature.ticketID;
    this.signatureService.formData.signature = sign;
    this.signatureService.formData.dtIns = new Date();

    this.signatureService.putSignature().subscribe(
      res => {
        this.ShowMessage("Firma registrata");
      },
      err => {
        //console.log(err);
        this.ShowMessage("Errore nel salvataggio", 'danger'  );
      }
    )
  }

  deleteRecord(){
    //NON DOVREBBE SERVIRE
  }


  unlockScreenOr(){
    this.screenOrientation.unlock();
  }
  
  async ShowMessage(msg: string, titolo?: string, colore?: string) {
    var mColor = colore;
    if(mColor== null)
      mColor='primary';

    const toast = await this.toastController.create({
      message: msg,
      color: mColor,
      duration: 2000,
      showCloseButton: true,  
      closeButtonText: 'OK',  
    });
    toast.present();
  }
}
