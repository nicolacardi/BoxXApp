import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Platform } from '@ionic/angular';
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

  signatureID: number;
  ticketID: number;
  public objTicket: ticket;
  public objSignature: ticketSignature;
  detailForm: FormGroup;
  
  signature = '';
  isDrawing = false;
  
  size1 : number;
  size2 : number;

  @ViewChild(SignaturePad,{static: false}) signaturePad: SignaturePad;
  public signaturePadOptions: Object;
  
  constructor(platform: Platform
    , private screenOrientation: ScreenOrientation
    , public route: ActivatedRoute
    , public serviceTicket: TicketService
    , public serviceSignature: TicketSignaturesService
    , private fb: FormBuilder
    ) { 


    // set to landscape
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);

    this.ticketID = this.route.snapshot.params['ticketId'];

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

    if (this.ticketID > 0) {

      this.serviceTicket.getTicket(this.ticketID.toString())
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
      this.serviceSignature.getSignature(this.ticketID)
      .subscribe(
        res=> {
          this.objSignature = res as ticketSignature;
        },
        err => {
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
      'canvasHeight': setheight -  setheight * 0.3 , //200
      'backgroundColor': 'transparent',
      'penColor': 'black'
    };

  }

  ngOnInit() {
    /*
    this.detailForm = this.fb.group({});
    this.detailForm = (this.fb.group({
      id: [this.localTicketDetail.id],
      ticketID: [this.localTicketDetail.ticketID],
      causaleID: [this.localTicketDetail.causaleID],
      dt: [this.localTicketDetail.dt],
      h_Ini: [this.localTicketDetail.h_Ini],
      h_End: [this.localTicketDetail.h_End],
      note: [this.localTicketDetail.note]
    })
    );
*/
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

  saveSignature() {
    this.signature = this.signaturePad.toDataURL();
    console.log("saveSignature: " , this.signature);

    console.log("objSignature: " , this.objSignature);

    //this.objSignature.signature = this.signature;
    this.InsertRecord(this.signature);
    

    // if(fg.controls['id'].value == '0' || fg.controls['id'].value == null ){
    //   this.InsertRecord(fg);
    // }
    // else{
    //   this.UpdateRecord(fg);
    // }

    //this.serviceSignature.postSignature()
    //this.storage.set('savedSignature', this.signature);
    this.signaturePad.clear();
  }

  InsertRecord(sign: string){

    this.serviceSignature.InitFormData();

    this.serviceSignature.formData.ticketID = this.ticketID;
    this.serviceSignature.formData.signature = sign;
    this.serviceSignature.formData.dtIns = null;

    this.serviceSignature.postSignature().subscribe(
      res => {
        //fg.patchValue({id: (res as ticketSignature).id});
        //AS!!!
        //this.localTicketDetail.id = (res as ticketDetail).id;

        //this.ShowMessage("Firma registrata");
      },
      err => {
        console.log(err);
        //this.ShowMessage("Errore nel salvataggio",'danger');
       }
    )
  }
  
  UpdateRecord(fg: FormGroup){
    this.serviceSignature.InitFormData();

    this.serviceSignature.formData.ticketID = fg.get("id").value;
    this.serviceSignature.formData.ticketID = fg.get("ticketID").value;
    this.serviceSignature.formData.signature = fg.get("signature").value;
    this.serviceSignature.formData.dtIns = fg.get("dtIns").value;

    this.serviceSignature.putSignature().subscribe(
      res => {
        //this.ShowMessage("Firma registrata");
      },
      err => {
        console.log(err);
        //this.ShowMessage("Errore nel salvataggio", 'danger'  );
      }
    )
  }

  deleteTicketDetail(fg: FormGroup){
    if(fg.controls["id"].value != null && fg.controls["id"].value != "0"){
      this.serviceSignature.deleteSignature(fg.controls["id"].value).subscribe(
        res => {
          //this.serviceSignature.refreshList(fg.controls["id"].value);
          //this.removedDetail.emit(fg.controls["id"].value);

          //this.ShowMessage("Record cancellato");
        },
        err => {
          console.log("ERRORE: " , err);
          //this.ShowMessage("Errore nella cancellazione", 'danger'  );
        }
      )
    }
    else{
      //TODO!!!
      //this.ticketDetailsForms.removeAt(i);
    }
  }



  /*
  postTicketDetail(){
    this.formData.ticketID = +this.formData.ticketID;
    return this.http.post( environment.apiBaseUrl   + '/TicketDetails',this.formData)  
  }  
  
  putTicketDetail(){
    this.formData.id = +this.formData.id;
    this.formData.ticketID = +this.formData.ticketID;
    
    return this.http.put( environment.apiBaseUrl  + '/TicketDetails/' + this.formData.id , this.formData)    
  }

  deleteTicketDetail(  id  ){
    return this.http.delete(  environment.apiBaseUrl  + '/TicketDetails/' + id ) ;
  }
*/
  unlockScreenOr(){
    this.screenOrientation.unlock();
  }
}
