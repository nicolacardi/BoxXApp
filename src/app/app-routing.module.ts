import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './services/authGuard.service';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', loadChildren: './public/login/login.module#LoginPageModule' },
  {
    path: 'todo',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./todo/todo.module').then( m => m.TodoPageModule)
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
