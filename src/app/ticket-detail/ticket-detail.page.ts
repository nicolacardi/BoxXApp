import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ticket, ticketDetail, ticketCausale } from '../models/models';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';

import { TicketService } from '../services/ticket.service';
import { TicketDetailService } from '../services/ticket-detail.service';
import { TicketCausaliService } from '../services/ticket-causali.service';
import { ToastController, IonContent } from '@ionic/angular';

import { Content } from '@angular/compiler/src/render3/r3_ast';
import { timestamp } from 'rxjs/operators';
import { getLocaleDateTimeFormat } from '@angular/common';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.page.html',
  styleUrls: ['./ticket-detail.page.scss'],
})
export class TicketDetailPage implements OnInit {

  @ViewChild('topPage', {static: false}) topPage: IonContent;

  //Data di default impostata in testata (opzionale)  
  dtDefault: Date;

  public  totCards: number;

  public  Ore: number;
  public  Minuti: number ;
  
  constructor(private route: ActivatedRoute, private fb: FormBuilder
    , public serviceTicket: TicketService
    , public serviceTicketDetails: TicketDetailService
    , public serviceTicketCausali: TicketCausaliService
    , public toastController: ToastController) { 

    }

  loading = true;

  public objTicket: ticket;
  ticketID: any;
  ticketDetails: ticketDetail[];
  ticketCausali: ticketCausale[];

  ticketDetailsForms: FormArray = this.fb.array([]);

  ngOnInit() {
    //init oggetto
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

    this.serviceTicketCausali.getCausaliList()
      .subscribe(
        res => this.ticketCausali = res as ticketCausale[]
      );

    this.serviceTicket.getTicket(this.ticketID)
      .subscribe(
        res => {
          this.objTicket = res as ticket;
          this.loading = false;
        }
      );

    this.serviceTicketDetails.getTicketDetailList(this.ticketID)
      .subscribe(
        res => {
          this.ticketDetails = res as ticketDetail[];
        }
      );

    let totOre: number=0;
    let totMinuti: number=0 ;
    this.totCards=0;
    //this.totOre=0;
    //this.totMinuti=0;

    this.ticketDetailsForms.clear();
    this.serviceTicketDetails.getTicketDetailList(this.ticketID).subscribe(
      res => {
        if (res == [] || res == null || res.length == 0) {
          this.addTicketDetailForm();
          this.loading = false;
        } else {
          //sort per far comparire i todo chiusi sotto, ordinati per data
          //res.sort((a, b) => new Date(b.dt).getTime() - new Date(a.dt).getTime())
          //  .sort((a, b) => a.isClosed < b.isClosed ? -1 : a.isClosed > b.isClosed ? 1 : 0);

          (res as []).forEach((detail: ticketDetail) => {
            
            this.totCards++;

            let diffInMs: number = Date.parse(detail.h_End.toString()) - Date.parse(detail.h_Ini.toString())

            var mins = Math.floor(diffInMs / 60000);
            totMinuti += mins;

            console.log("diffInMs: " ,  diffInMs.toString());
            console.log("Mins: " ,  mins.toString());
            console.log("totMinuti: " +  totMinuti.toString());

            this.ticketDetailsForms.push(this.fb.group({
              id: [detail.id],
              ticketID: [detail.ticketID],
              causaleID: [detail.causaleID],
              dt: [detail.dt],
              h_Ini: [detail.h_Ini],
              h_End: [detail.h_End],
              note: [detail.note]
            })
            );
          });
          this.Minuti   = totMinuti % 60;
          this.Ore = Math.floor( totMinuti / 60) % 24;

          this.loading = false;
        }
      }
    );
  }
  setTodayDate(){
    //this.dtDefault = new Date();
    console.log("this.objTicket.data1",this.objTicket.data1);
    console.log("Date()",Date());

    let myDate = Date();

    //this.objTicket.data1 = this.datepipe.transform(this.objTicket.data1, 'dd/MM/yyyy');
    //this.objTicket.data1.setUTCFullYear(myDate.getFullYear(), mydate.getmon)
  }

  addTicketDetailForm() {
    console.log("Dt default: ", this.dtDefault);

    this.ticketDetailsForms.insert(0, this.fb.group({
      id: [0],
      userID: [''],
      causaleID: [0],
      ticketID: [this.ticketID ],

      //dt: [null],
      //dt: [this.dtDefault],
      dt: [this.objTicket.data1],
      
      h_Ini: [null],
      h_End: [null],
      note: ['']
    }));  

    this.topPage.scrollToTop();
  }

  saveTicketDetail(fg: FormGroup){
    if(fg.controls['id'].value == '0' ){
      this.InsertRecord(fg);
    }
    else{
      this.UpdateRecord(fg);
    }
    fg.markAsPristine();
  }
  
  InsertRecord(fg: FormGroup){

    this.serviceTicketDetails.InitFormData();

    this.serviceTicketDetails.formData.ticketID = fg.get("ticketID").value;
    this.serviceTicketDetails.formData.causaleID = fg.get("causaleID").value;
    this.serviceTicketDetails.formData.dt = fg.get("dt").value;

    //console.log("h_ini: ", fg.get("h_Ini").value);
    
    this.serviceTicketDetails.formData.h_Ini = fg.get("h_Ini").value;
    this.serviceTicketDetails.formData.h_End = fg.get("h_End").value;
    this.serviceTicketDetails.formData.note = fg.get("note").value;

    this.serviceTicketDetails.postTicketDetail().subscribe(
      res => {
        //this.serviceDetails.refreshList(this.serviceDetails.formData.ticketID);
        //this.resetForm(form);
        
        //fg.patchValue({ id: res.id });     ///riporto l'id generato dall'insert
        
        this.ShowMessage("Record inserito");
      },
      err => {
        console.log(err);
        this.ShowMessage("Errore nel salvataggio",'danger');
       }
    )
  }
  
  UpdateRecord(fg: FormGroup){
    this.serviceTicketDetails.InitFormData();

    this.serviceTicketDetails.formData.id = fg.get("id").value;
    this.serviceTicketDetails.formData.ticketID = fg.get("ticketID").value;
    this.serviceTicketDetails.formData.causaleID = fg.get("causaleID").value;
    this.serviceTicketDetails.formData.dt = fg.get("dt").value;
    
    console.log("h_ini: ",  fg.get("h_Ini").value);
    console.log("h_end: ",  fg.get("h_End").value);

    this.serviceTicketDetails.formData.h_Ini = fg.get("h_Ini").value;
    this.serviceTicketDetails.formData.h_End = fg.get("h_End").value;
    this.serviceTicketDetails.formData.note = fg.get("note").value;

    this.serviceTicketDetails.putTicketDetail().subscribe(
      res => {
        //this.serviceDetails.refreshList(this.serviceDetails.formData.ticketID);
        //this.resetForm(form);

        this.ShowMessage("Record aggiornato");
      },
      err => {
        console.log(err);
        this.ShowMessage("Errore nel salvataggio", 'danger'  );
      }
    )
  }

  deleteTicketDetail(fg: FormGroup, i){
    if(fg.controls["id"].value != "0"){
      this.serviceTicketDetails.deleteTicketDetail(fg.controls["id"].value).subscribe(
        res => {
          this.serviceTicketDetails.refreshList(fg.controls["id"].value);
          this.ticketDetailsForms.removeAt(i);

          this.ShowMessage("Record cancellato");
        },
        err => {
          console.log(err);
          this.ShowMessage("Errore nella cancellazione", 'danger'  );
        }
      )
    }
    else{
      this.ticketDetailsForms.removeAt(i);
    }
  }

  onChange(fg: FormGroup, i){


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
