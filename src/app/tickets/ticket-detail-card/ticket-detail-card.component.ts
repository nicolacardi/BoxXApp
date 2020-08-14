import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ticketDetail, ticketCausale } from '../../_models/models';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ToastController } from '@ionic/angular';

import { TicketDetailService } from '../../_services/ticket-detail.service';

@Component({
  selector: 'app-ticket-detail-card',
  templateUrl: './ticket-detail-card.component.html',
  styleUrls: ['./../tickets.scss'],
})

export class TicketDetailCardComponent implements OnInit, OnDestroy {

  @Input()            
  localTicketDetail :  ticketDetail;
  
  @Input()            
  ticketCausali: ticketCausale[];
  
  @Input()            
  statoTicket : string;

  @Output() removedDetail = new EventEmitter();


  detailForm: FormGroup;
  
  constructor( private fb: FormBuilder    
    , public serviceTicketDetails: TicketDetailService
    , public toastController: ToastController) {
     
  }

  ngOnInit() {

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

  ngOnDestroy(){

  }
  
  saveTicketDetail(fg: FormGroup){
    //console.log("saveTicketDetail di ticket-detail-card.component.ts");
    //console.log("fg.controls['id'].value"+ fg.controls['id'].value);
    if(fg.controls['id'].value == '0' || fg.controls['id'].value == null ){
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
    this.serviceTicketDetails.formData.h_Ini = fg.get("h_Ini").value;
    this.serviceTicketDetails.formData.h_End = fg.get("h_End").value;
    this.serviceTicketDetails.formData.note = fg.get("note").value;

    console.log("InsertRecord di ticket-detail-card.component.ts");
    console.log("ticketID: ", fg.get("ticketID").value);
    console.log("causaleID: ", fg.get("causaleID").value);
    console.log("h_Ini: ", fg.get("h_Ini").value);
    console.log("h_End: ", fg.get("h_End").value);
    console.log("note: ", fg.get("note").value);

    this.serviceTicketDetails.postTicketDetail().subscribe(
      res => {
        fg.patchValue({id: (res as ticketDetail).id});
        //AS!!!
        this.localTicketDetail.id = (res as ticketDetail).id;

        this.ShowMessage("Dato salvato");
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
    this.serviceTicketDetails.formData.h_Ini = fg.get("h_Ini").value;
    this.serviceTicketDetails.formData.h_End = fg.get("h_End").value;
    this.serviceTicketDetails.formData.note = fg.get("note").value;

    this.serviceTicketDetails.putTicketDetail().subscribe(
      res => {
        //this.serviceDetails.refreshList(this.serviceDetails.formData.ticketID);
        //this.resetForm(form);

        this.ShowMessage("Dato salvato");
      },
      err => {
        console.log(err);
        this.ShowMessage("Errore nel salvataggio", 'danger'  );
      }
    )
  }

  deleteTicketDetail(fg: FormGroup){
    if(fg.controls["id"].value != null && fg.controls["id"].value != "0"){
      this.serviceTicketDetails.deleteTicketDetail(fg.controls["id"].value).subscribe(
        res => {
          this.serviceTicketDetails.refreshList(fg.controls["id"].value);
          this.removedDetail.emit(fg.controls["id"].value);

          //this.ShowMessage("Record cancellato");
        },
        err => {
          console.log("ERRORE: " , err);
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
