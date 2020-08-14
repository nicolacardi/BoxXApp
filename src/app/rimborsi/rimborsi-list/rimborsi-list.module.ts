import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RimborsiListPageRoutingModule } from './rimborsi-list-routing.module';

import { RimborsiListPage } from './rimborsi-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RimborsiListPageRoutingModule
  ],
  declarations: [RimborsiListPage]
})
export class RimborsiListPageModule {}
