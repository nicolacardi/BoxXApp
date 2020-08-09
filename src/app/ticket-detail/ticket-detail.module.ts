import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { TicketDetailPageRoutingModule } from './ticket-detail-routing.module';
import { TicketDetailPage } from './ticket-detail.page';
import { TicketDetailCardComponent } from '../ticket-detail-card/ticket-detail-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TicketDetailPageRoutingModule
  ],
  declarations: [TicketDetailPage, TicketDetailCardComponent],

  entryComponents: [TicketDetailCardComponent]                //AS - component
  
})

export class TicketDetailPageModule {}
