import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MissionsListPage } from './missions-list.page';

const routes: Routes = [
  {
    path: '',
    component: MissionsListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MissionsListPageRoutingModule {}
