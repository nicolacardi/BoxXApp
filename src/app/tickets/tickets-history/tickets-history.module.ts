import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TicketsHistoryPageRoutingModule } from './tickets-history-routing.module';
import { TicketsHistoryPage } from './tickets-history.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TicketsHistoryPageRoutingModule
  ],
  exports: [RouterModule],
  declarations: [TicketsHistoryPage]
})
export class TicketsHistoryPageModule {}
