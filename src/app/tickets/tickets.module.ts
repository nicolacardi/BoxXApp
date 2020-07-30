import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TicketsPageRoutingModule } from './tickets-routing.module';
import { TicketsPage } from './tickets.page';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: TicketsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,         
    TicketsPageRoutingModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TicketsPage]
})
export class TicketsPageModule {}
