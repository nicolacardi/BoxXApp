import { Component, OnInit, Input, OnDestroy, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ToastController, IonSelect } from '@ionic/angular';

import { missionDetail, missionCausale, currency } from '../../_models/models';
import { MissionDetailsService } from 'src/app/_services/mission-details.service';


@Component({
  selector: 'app-mission-detail-card',
  templateUrl: './mission-detail-card.component.html',
  styleUrls: ['./../missions.scss'],
})

export class MissionDetailCardComponent implements OnInit, OnDestroy {

  @Input()            
  localMissionDetail :  missionDetail;
  
  @Input()            
  missionCausali: missionCausale[];
  
  @Input()            
  missionValute: currency[];

  @Input()            
  statoMission : string;

  @Output() removedDetail = new EventEmitter();

  @ViewChild('causaleID', {static: false}) cardSelect: IonSelect;
  
  detailForm: FormGroup;
  
  constructor( private fb: FormBuilder    
    , public serviceMissionDetails: MissionDetailsService
    , public toastController: ToastController
    ) {
     
  }

  ngOnInit() {
    
    //this.detailForm = this.fb.group({});
    this.detailForm = (this.fb.group({
      id: [this.localMissionDetail.id],
      missionID: [this.localMissionDetail.missionID],
      
      causaleID: [this.localMissionDetail.causaleID],
      valutaID: [this.localMissionDetail.valutaID],
      ticketID: [this.localMissionDetail.ticketID],

      tipoPagamento: [this.localMissionDetail.tipoPagamento],
      importo: [this.localMissionDetail.importo],
      dt: [this.localMissionDetail.dt],
      stato: [this.localMissionDetail.stato],
      note: [this.localMissionDetail.note],

      dtIns: [this.localMissionDetail.dtIns],
      dtSub: [this.localMissionDetail.dtSub],
      dtClosed: [this.localMissionDetail.dtClosed]
    })
    );
  }

  ngOnDestroy(){

  }
  
  saveMissionDetail(fg: FormGroup){
    //console.log("saveTicketDetail di ticket-detail-card.component.ts");
    //console.log("fg.controls['id'].value"+ fg.controls['id'].value);

    console.log("saveMissionDetail: " , fg.controls['id'].value);
    if( fg.controls['id'].value == null || fg.controls['id'].value == '0' ){
      this.InsertRecord(fg);
    }
    else{
      this.UpdateRecord(fg);
    }
    fg.markAsPristine();
  }
  
  InsertRecord(fg: FormGroup){

    console.log("InsertRecord: " , fg );

    this.serviceMissionDetails.InitFormData();

    this.serviceMissionDetails.formData.id = 0;
    this.serviceMissionDetails.formData.missionID = this.localMissionDetail.missionID;

    this.serviceMissionDetails.formData.causaleID = fg.get("causaleID").value;
    this.serviceMissionDetails.formData.valutaID = fg.get("valutaID").value;
    this.serviceMissionDetails.formData.ticketID = fg.get("ticketID").value;
    
    this.serviceMissionDetails.formData.tipoPagamento = fg.get("tipoPagamento").value;
    this.serviceMissionDetails.formData.importo = fg.get("importo").value;
    this.serviceMissionDetails.formData.dt = fg.get("dt").value;
    this.serviceMissionDetails.formData.stato = fg.get("stato").value;
    this.serviceMissionDetails.formData.note = fg.get("note").value;

    this.serviceMissionDetails.formData.dtIns = fg.get("dtIns").value;
    this.serviceMissionDetails.formData.dtSub = fg.get("dtSub").value;
    this.serviceMissionDetails.formData.dtClosed = fg.get("dtClosed").value;

    console.log("POST start");

    this.serviceMissionDetails.postMissionDetail().subscribe(
      res => {
        console.log("POST result:", res);

        fg.patchValue({id: (res as missionDetail).id});
        //AS!!!
        this.localMissionDetail.id = (res as missionDetail).id;

        this.ShowMessage("Dato salvato");
      },
      err => {
        console.log(err);
        this.ShowMessage("Errore nel salvataggio",'danger');
       }
    )
  }
  
  UpdateRecord(fg: FormGroup){

    console.log("UpdateRecord: " , fg );
    console.log("missionID: ", this.localMissionDetail.missionID);


    this.serviceMissionDetails.InitFormData();
    this.serviceMissionDetails.formData.id =  fg.get("id").value;
    this.serviceMissionDetails.formData.missionID = this.localMissionDetail.missionID;

    this.serviceMissionDetails.formData.causaleID = fg.get("causaleID").value;
    this.serviceMissionDetails.formData.valutaID = fg.get("valutaID").value;
    this.serviceMissionDetails.formData.ticketID = fg.get("ticketID").value;
    
    this.serviceMissionDetails.formData.tipoPagamento = fg.get("tipoPagamento").value;
    this.serviceMissionDetails.formData.importo = fg.get("importo").value;
    this.serviceMissionDetails.formData.dt = fg.get("dt").value;
    this.serviceMissionDetails.formData.stato = fg.get("stato").value;
    this.serviceMissionDetails.formData.note = fg.get("note").value;

    this.serviceMissionDetails.formData.dtIns = fg.get("dtIns").value;
    this.serviceMissionDetails.formData.dtSub = fg.get("dtSub").value;
    this.serviceMissionDetails.formData.dtClosed = fg.get("dtClosed").value;

    this.serviceMissionDetails.putMissionDetail().subscribe(
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

  deleteMissionDetail(fg: FormGroup){
    
    if(fg.controls["id"].value != null && fg.controls["id"].value != "0"){
      this.serviceMissionDetails.deleteMissionDetail(fg.controls["id"].value).subscribe(
        res => {
          this.serviceMissionDetails.refreshList(fg.controls["id"].value);
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
