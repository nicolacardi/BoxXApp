import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomersListPageRoutingModule } from './customers-list-routing.module';
import { CustomersListPage } from './customers-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomersListPageRoutingModule
  ],
  declarations: [CustomersListPage]
})
export class CustomersListPageModule {}
