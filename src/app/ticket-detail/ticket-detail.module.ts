import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TicketDetailPageRoutingModule } from './ticket-detail-routing.module';
import { TicketDetailPage } from './ticket-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TicketDetailPageRoutingModule
  ],
  declarations: [TicketDetailPage]
})
export class TicketDetailPageModule {}
