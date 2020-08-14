import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MissionCardPage } from './mission-card.page';

const routes: Routes = [
  {
    path: '',
    component: MissionCardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MissionCardPageRoutingModule {}
