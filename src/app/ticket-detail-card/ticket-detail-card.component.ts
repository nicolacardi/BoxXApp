import { Component, OnInit, Input } from '@angular/core';
import { ticketDetail, ticketCausale } from '../models/models';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { TicketCausaliService } from '../services/ticket-causali.service';
import { TicketDetailService } from '../services/ticket-detail.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-ticket-detail-card',
  templateUrl: './ticket-detail-card.component.html',
  styleUrls: ['./ticket-detail-card.component.scss'],
})

export class TicketDetailCardComponent implements OnInit {

  @Input()            
  localTicketDetail :  ticketDetail;
  
  @Input()            
  ticketCausali: ticketCausale[];
  
  detailForm: FormGroup;
  
  constructor( private fb: FormBuilder    
    , public serviceTicketDetails: TicketDetailService
    //, public serviceTicketCausali: TicketCausaliService
    , public toastController: ToastController) {
     
  }

  ngOnInit() {
    /* le causali vengono passate in @input
    this.serviceTicketCausali.getCausaliList()
    .subscribe(
      res => {
        this.ticketCausali = res as ticketCausale[];
        console.log("getCausaliList completed");
      },
      err => {
        console.log("getCausaliList ERROR: ", err);
      }
    );
      */

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
          //TODO!!!
          //this.ticketDetailsForms.removeAt(i);          this.ShowMessage("Record cancellato");
        },
        err => {
          console.log(err);
          this.ShowMessage("Errore nella cancellazione", 'danger'  );
        }
      )
    }
    else{
      //TODO!!!
      //this.ticketDetailsForms.removeAt(i);
    }
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
