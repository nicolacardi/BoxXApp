import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './services/authGuard.service';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { 
    path: 'members', 
    canActivate: [AuthGuardService],
    loadChildren: './tabs/tabs.module#TabsPageModule'
  },
  { path: 'login', loadChildren: './public/login/login.module#LoginPageModule' },
  {
    path: 'todo',
    loadChildren: () => import('./todo/todo.module').then( m => m.TodoPageModule)
  },
  {
    path: 'todo-detail',
    loadChildren: () => import('./todo-detail/todo-detail.module').then( m => m.TodoDetailPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
