import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';

import { TicketsListPageRoutingModule } from './tickets-list-routing.module';
import { TicketsListPage } from './tickets-list.page';


const routes: Routes = [
  {
    path: '',
    component: TicketsListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,         
    TicketsListPageRoutingModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TicketsListPage]
})
export class TicketsListPageModule {}
