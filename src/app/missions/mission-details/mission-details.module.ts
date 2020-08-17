import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { MissionDetailsPageRoutingModule } from './mission-details-routing.module';
import { MissionDetailsPage } from './mission-details.page';
import { MissionDetailCardComponent } from './../mission-detail-card/mission-detail-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MissionDetailsPageRoutingModule
  ],
  declarations: [MissionDetailsPage, MissionDetailCardComponent],
  entryComponents: [MissionDetailCardComponent]                //AS - component
})
export class MissionDetailsPageModule {}


export class TicketDetailPageModule {}
