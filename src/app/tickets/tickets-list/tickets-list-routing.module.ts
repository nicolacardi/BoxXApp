import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TicketsListPage } from './tickets-list.page';

const routes: Routes = [
  {
    path: '',
    component: TicketsListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TicketsListPageRoutingModule {}


