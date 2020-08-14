import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MissionsListPageRoutingModule } from './missions-list-routing.module';

import { MissionsListPage } from './missions-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MissionsListPageRoutingModule
  ],
  declarations: [MissionsListPage]
})
export class MissionsListPageModule {}
