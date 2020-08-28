import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomersListPageRoutingModule } from './customers-list-routing.module';
import { CustomersListPage } from './customers-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CustomersListPageRoutingModule
  ],
  declarations: [CustomersListPage]
})
export class CustomersListPageModule {}
