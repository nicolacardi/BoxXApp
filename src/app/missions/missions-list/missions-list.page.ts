import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AlertController } from '@ionic/angular';
import { FormBuilder } from '@angular/forms';

import { mission, ticket } from 'src/app/_models/models';
import { MissionService } from '../../_services/mission.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-missions-list',
  templateUrl: './missions-list.page.html',
  styleUrls: ['./../missions.scss'],
})
export class MissionsListPage implements OnInit {

  missions: mission[];
  loading = true;

  constructor(private router: Router,
    private fb: FormBuilder,
    private missionService: MissionService,
    public alertController: AlertController) {

     }

  ngOnInit() {
    this.missionService.getMissionsList()
    .subscribe(
      res=>   { 
        this.missions = res as mission[];
        res.sort((a, b) =>a.id < b.id ? -1: 1);

        this.loading = false;
     }
    );
  }

  async closeMission() {
    const alert = await this.alertController.create({
      header: 'CHIUSURA TRASFERTA',
      message: 'Si desidera chiudere la trasferta?<br/>(operazione irreversibile)',
      buttons: ['NO', 'CHIUDI LA TRASFERTA']
    });
    await alert.present();
  }

  async deleteMission(id) {

    let retValue: boolean;

    const alert = await this.alertController.create({
      header: 'CANCELLAZIONE TRASFERTA',
      message: 'Si desidera cancellare la trasferta?<br/>(operazione irreversibile)',
      buttons: [
        {
          text: 'NO',
          role: 'cancel'
        },
        {
          text: 'CANCELLA LA TRASFERTA',
          handler: () => {
            this.missionService.deleteMission(id).subscribe(
              res=>{

                let j=0;
                this.missions.forEach(element => {
                  if(element.id == id){
                    this.missions.splice(j,1);
                  }
                  j++;
                }); 
              },
              err=>{
                console.log('ERRORE IN CANCELLAZIONE');
              }
            )
          }
        }
      ]
    });
    await alert.present();
  }

  openDetail(id, slideitem){
    slideitem.close();
    this.router.navigateByUrl('/mission-detail/' + id);
  }
  openDefault(id){
    this.router.navigateByUrl('/mission-detail/' + id);
  }

  addMission(){
    this.missionService.postMission().subscribe(
      res  => {
        this.missions.push(
          { id:(res as mission).id, userID: (res as mission).userID, descrizione: null, stato: 'I', valutaID:1, dtIns: new Date() , dtSub:null, dtClosed:null }
        )
        
        //this.ShowMessage("Dato salvato");
      },
      err => {
        console.log(err);
        //this.ShowMessage("Errore nel salvataggio",'danger');
       }
    )
    // this.topPage.scrollToTop();
  }
}
