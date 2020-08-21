import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AlertController } from '@ionic/angular';
import { FormBuilder } from '@angular/forms';

import { mission } from 'src/app/_models/models';
import { MissionService } from '../../_services/mission.service';

@Component({
  selector: 'app-missions-list',
  templateUrl: './missions-list.page.html',
  styleUrls: ['./../missions.scss'],
})
export class MissionsListPage implements OnInit {

  missions: mission[];
  missions_I: mission[];
  missions_S: mission[];

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
        
        this.missions_I = this.missions.filter( item =>{
          return item.stato.toUpperCase() == "I";
        });

        this.missions_S = this.missions.filter( item =>{
          return item.stato.toUpperCase() == "S";
        });
        this.loading = false;
     }
    );
  }

  async closeMission(id) {

    const alert = await this.alertController.create({
      header: 'CHIUSURA TRASFERTA',
      message: 'Si desidera chiudere la trasferta?<br/>(operazione irreversibile)',
      buttons: [
        {
          text: 'NO',
          role: 'cancel'
        },
        {
          text: 'CHIUDI LA TRASFERTA',
          handler: () => {
            this.missionService.confirmMission(id)
              .subscribe(
              res=>{
                
                console.log('CHIUSURA EFFETTUATA');

                // let j=0;
                // this.missions.forEach(element => {
                //   if(element.id == id){
                //     this.missions.splice(j,1);
                //   }
                //   j++;
                // }); 
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

  openDetail(id){
    //slideitem.close();
    this.router.navigateByUrl('/mission-details/' + id);
  }
  openDefault(id){
    this.router.navigateByUrl('/mission-details/' + id);
  }

  addMission(){
    this.missionService.postMission().subscribe(
      res  => {
        this.missions.push(
          { id:(res as mission).id, userID: (res as mission).userID, descrizione: null, stato: 'I', valutaID:1, dtIns: (res as mission).dtIns , dtSub:null, dtClosed:null }
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
