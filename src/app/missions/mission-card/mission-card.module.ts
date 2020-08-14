import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MissionCardPageRoutingModule } from './mission-card-routing.module';

import { MissionCardPage } from './mission-card.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MissionCardPageRoutingModule
  ],
  declarations: [MissionCardPage]
})
export class MissionCardPageModule {}
