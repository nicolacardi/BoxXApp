import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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

  {
    path: 'todo',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./todo/todo.module').then( m => m.TodoPageModule)
  },
  {
    path: 'tickets',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./tickets/tickets.module').then( m => m.TicketsPageModule)
  },
  {
    path: 'home',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'todo-detail/:id',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./todo-detail/todo-detail.module').then( m => m.TodoDetailPageModule)
  },
  {
    path: 'password-reset',
    loadChildren: () => import('./public/password-reset/password-reset.module').then( m => m.PasswordResetPageModule)
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
