import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { AuthGuardService } from './_services/authGuard.service';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  //Public
  { 
    path: 'login', 
    loadChildren: () => import('./public/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./public/registration/registration.module').then( m => m.RegistrationPageModule)
  },
  {
    path: 'password-reset',
    loadChildren: () => import('./public/password-reset/password-reset.module').then( m => m.PasswordResetPageModule)
  },
  //Private       
  //ATTENZIONE! riattivare AuthGuard prima della Build/Release
  {
    path: 'home',
    canActivate: [AuthGuardService],          
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'todo',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./todo/todo.module').then( m => m.TodoPageModule)
  },
  {
    path: 'todo-detail/:id',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./todo-detail/todo-detail.module').then( m => m.TodoDetailPageModule)
  },

  // {
  //   path: 'tickets',
  //   canActivate: [AuthGuardService],
  //   loadChildren: () => import('./tickets/tickets-list/tickets-list.module').then( m => m.TicketsListPageModule)
  // },
    {
    path: 'tabs',
    //canActivate: [AuthGuardService],
    loadChildren: () => import('./tickets/tickets-tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'ticket-detail/:id',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./tickets/ticket-details/ticket-details.module').then( m => m.TicketDetailPageModule)
  },
  {
    path: 'tickets-history',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./tickets/tickets-history/tickets-history.module').then( m => m.TicketsHistoryPageModule)
  },
  {
    path: 'missions-list',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./missions/missions-list/missions-list.module').then( m => m.MissionsListPageModule)
  },
  {
    path: 'mission-details/:id',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./missions/mission-details/mission-details.module').then( m => m.MissionDetailsPageModule)
  },   {
    path: 'customers-list',
    loadChildren: () => import('./customers/customers-list/customers-list.module').then( m => m.CustomersListPageModule)
  }

];


// QUESTO MANDAVA ALLA HOME CON LE TABS CHE E' COMPOSTA 
// DA TABS, TABS-SETTINGS E TABS-HOME
// { 
//   path: 'members', 
//   canActivate: [AuthGuardService],
//   loadChildren: './tabs/tabs.module#TabsPageModule'
// },


@NgModule({
  //imports: [RouterModule.forRoot(routes)], NC per provare tabs
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
