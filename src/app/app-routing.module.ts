import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuardService } from './services/authGuard.service';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  //Public
  { 
    path: 'login', 
    //loadChildren: './public/login/login.module#LoginPageModule' 
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
    canActivate: [AuthGuardService],
    loadChildren: () => import('./tickets/tickets-tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'ticket-detail/:id',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./tickets/ticket-detail/ticket-detail.module').then( m => m.TicketDetailPageModule)
  },
  {
    path: 'tickets-history',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./tickets/tickets-history/tickets-history.module').then( m => m.TicketsHistoryPageModule)
  },
  {
    path: 'rimborsi-list',
    loadChildren: () => import('./rimborsi/rimborsi-list/rimborsi-list.module').then( m => m.RimborsiListPageModule)
  },

  {
    path: 'rimborsi-card',
    loadChildren: () => import('./rimborsi/rimborsi-card/rimborsi-card.module').then( m => m.RimborsiCardPageModule)
  }


];


// { 
//   path: 'members', 
//   canActivate: [AuthGuardService],
//   loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
// },



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
