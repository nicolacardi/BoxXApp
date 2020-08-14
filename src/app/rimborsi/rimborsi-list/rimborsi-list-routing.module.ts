import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RimborsiListPage } from './rimborsi-list.page';

const routes: Routes = [
  {
    path: '',
    component: RimborsiListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RimborsiListPageRoutingModule {}
