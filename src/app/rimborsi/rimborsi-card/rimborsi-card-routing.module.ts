import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RimborsiCardPage } from './rimborsi-card.page';

const routes: Routes = [
  {
    path: '',
    component: RimborsiCardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RimborsiCardPageRoutingModule {}
