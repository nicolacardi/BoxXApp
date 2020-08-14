import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../tickets-list/tickets-list.module').then( m => m.TicketsListPageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tickets-history/tickets-history.module').then(m => m.TicketsHistoryPageModule)
      },
      {
        path: '',
        redirectTo: 'tabs/tab1', //maledetto aveva uno slash di troppo! (/tabs/tab1)
        pathMatch: 'full'
      }
    ]
  },

  
  {
    path: '',
    redirectTo: 'tabs/tab1',//maledetto aveva uno slash di troppo! (/tabs/tab1
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
