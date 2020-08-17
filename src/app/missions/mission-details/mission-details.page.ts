import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { ToastController, IonContent } from '@ionic/angular';

import { mission, missionDetail, missionCausale, currency } from '../../_models/models';
import { MissionService } from '../../_services/mission.service';
import { MissionDetailsService } from '../../_services/mission-details.service';
import { MissionCausaliService } from '../../_services/mission-causali.service';
import { MissionDetailCardComponent } from '../mission-detail-card/mission-detail-card.component';

import { CurrenciesService } from 'src/app/_services/currencies.service';
import { DatePipe, NumberSymbol } from '@angular/common';


@Component({
  selector: 'app-mission-details',
  templateUrl: './mission-details.page.html',
  styleUrls: ['./../missions.scss'],
})

export class MissionDetailsPage implements OnInit {

  @ViewChild('topPage', { static: false }) topPage: IonContent;
  @ViewChild('dtDefault', { static: false }) dtDefault: ElementRef;

  removedDetail:any;

  //Data di default impostata in testata (opzionale)  
  //dtDefault: Date;

  public totCards: number;
  public totImporto: number;

  constructor(private route: ActivatedRoute, private fb: FormBuilder
    , public serviceMission: MissionService
    , public serviceMissionDetails: MissionDetailsService
    , public serviceMissionCausali: MissionCausaliService
    , public serviceMissionValute: CurrenciesService
    , public toastController: ToastController) {

  }

  loading = true;

  public objMission : mission;
  missionID: any;
  missionDetails: missionDetail[];
  missionCausali: missionCausale[];
  missionValute: currency[];


  ngOnInit() {
    //init oggetto [mission]
    if (this.objMission == null) {
      this.objMission = {
        id: 0,
        userID: null,
        descrizione: null,
        stato: null,
        valutaID: 0,
        dtIns: null,
        dtSub: null,
        dtClosed: null
      }
    }

    this.missionID = this.route.snapshot.params['id'];

    this.serviceMissionCausali.getCausaliList()
    .subscribe(
      res => this.missionCausali = res as missionCausale[]
    );

    this.serviceMissionValute.getCurrenciesList()
    .subscribe(
      res => this.missionValute = res as currency[]
    );

    this.serviceMission.getMission(this.missionID)
    .subscribe(
      res => {
        this.objMission = res as mission;
        this.loading = false;
      }
    );

    this.serviceMissionDetails.getMissionDetailList(this.missionID)
    .subscribe(
      res => {
        this.missionDetails = res as missionDetail[];
      }
    );

    this.totCards = 0;
    this.totImporto=0;
    
    this.serviceMissionDetails.getMissionDetailList(this.missionID).subscribe(
      res => {
        if (res == [] || res == null || res.length == 0) {
          this.addMissionDetail();
          this.loading = false;
        } else {
          //sort per far comparire i todo chiusi sotto, ordinati per data
          //res.sort((a, b) => new Date(b.dt).getTime() - new Date(a.dt).getTime())
          //  .sort((a, b) => a.isClosed < b.isClosed ? -1 : a.isClosed > b.isClosed ? 1 : 0);

          (res as []).forEach((detail: missionDetail) => {

            this.totCards++;

            //let diffInMs: number = Date.parse(detail.h_End.toString()) - Date.parse(detail.h_Ini.toString())

            //var mins = Math.floor(diffInMs / 60000);
            //totMinuti += mins;
          });
          //this.Minuti = totMinuti % 60;
          //this.Ore = Math.floor(totMinuti / 60) % 24;

          this.loading = false;
        }
      }
    );
  }

  addMissionDetail() {

    this.missionDetails.unshift({ 
      id: null, 
      missionID: this.objMission.id,
      causaleID: null, objCausale: null, 
      //valutaID: null, objValuta: null,
      valutaID: this.objMission.valutaID, objValuta: null,
      ticketID: null, objTicket: null,
      tipoPagamento:null,
      importo:0,
      dt:this.objMission.dtIns,
      stato:null,
      note:null,
      dtIns: new Date(),
      dtSub: null,
      dtClosed: null
    });


    this.topPage.scrollToTop();
  }

  removedDetailCard(id){ 
    let j=0;
    this.missionDetails.forEach(element => {
     //console.log("i=", id , "  element.id=", element.id);
     if(element.id == id){
       this.missionDetails.splice(j,1);
     }
     j++;
   }); 
  }

  setTodayDate(){

    let oggi = new Date();

    //this.objMission.dtIns = new Date();
  }

  onChange(data: string, descrizione: string ) {


    // if (fg.controls['isClosed'].dirty ||
    //   fg.controls['titolo'].dirty ||
    //   fg.controls['dettagli'].dirty) {

      this.loading = true;
    
      //Update
      let fd =  {
        'id': this.objMission.id,
        'userID': this.objMission.userID,

        'descrizione': descrizione,
        'stato':this.objMission.stato,
        'valutaID': this.objMission.valutaID,
        
        'dtIns': data,
        'dtSub': this.objMission.dtSub,
        'dtClosed':this.objMission.dtClosed
      };
      
      this.serviceMission.putMission(fd).subscribe(
        (res: any) => {
          //fg.reset(fg.value);
          //this.showNotification('update');
        });
    
      this.loading = false;
  }

  onChangeValuta( valutaID: string) {

      this.loading = true;
    
      //Update
      let fd =  {
        'id': this.objMission.id,
        'userID': this.objMission.userID,
        
        'descrizione': this.objMission.descrizione,
        'stato':this.objMission.stato,
        'valutaID':  parseInt( valutaID),
        
        'dtIns': this.objMission.dtIns,
        'dtSub': this.objMission.dtSub,
        'dtClosed':this.objMission.dtClosed
      };
      
      this.serviceMission.putMission(fd).subscribe(
        (res: any) => {
          //fg.reset(fg.value);
          //this.showNotification('update');
        });
    
      this.loading = false;
  }

  async ShowMessage(msg: string, titolo?: string, colore?: string) {
    var mColor = colore;
    if (mColor == null)
      mColor = 'primary';

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
