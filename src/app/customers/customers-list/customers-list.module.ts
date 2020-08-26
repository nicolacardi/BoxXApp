import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomersListPageRoutingModule } from './customers-list-routing.module';
import { CustomersListPage } from './customers-list.page';
import { CustomerCardComponent} from '../customer-card/customer-card.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CustomersListPageRoutingModule
  ],
  declarations: [CustomersListPage, CustomerCardComponent],
  entryComponents: [CustomerCardComponent]
})
export class CustomersListPageModule {}
