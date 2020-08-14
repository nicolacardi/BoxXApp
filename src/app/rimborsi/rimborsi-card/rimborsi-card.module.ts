import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RimborsiCardPageRoutingModule } from './rimborsi-card-routing.module';

import { RimborsiCardPage } from './rimborsi-card.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RimborsiCardPageRoutingModule
  ],
  declarations: [RimborsiCardPage]
})
export class RimborsiCardPageModule {}
