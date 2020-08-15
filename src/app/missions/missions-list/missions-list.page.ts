import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { mission, ticket } from 'src/app/models/models';
import { MissionService } from '../../services/mission.service';
import { AlertController } from '@ionic/angular';
import { FormBuilder } from '@angular/forms';

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

  openDetail(id, slideitem){
    slideitem.close();
    this.router.navigateByUrl('/mission-detail/' + id);
  }
  openDefault(id){
    this.router.navigateByUrl('/mission-detail/' + id);
  }

  addMission(){
    this.missionService.postMission();
  }
}
