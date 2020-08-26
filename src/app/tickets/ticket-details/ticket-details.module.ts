import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { TicketDetailsPageRoutingModule } from './ticket-details-routing.module';
import { TicketDetailsPage } from './ticket-details.page';
import { TicketDetailCardComponent } from '../ticket-detail-card/ticket-detail-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TicketDetailsPageRoutingModule
  ],
  declarations: [TicketDetailsPage, TicketDetailCardComponent],

  entryComponents: [TicketDetailCardComponent]
  
})

export class TicketDetailPageModule {}
