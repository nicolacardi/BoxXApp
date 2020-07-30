import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TodoPageRoutingModule } from './todo-routing.module';
import { TodoPage } from './todo.page';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: TodoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,        
    TodoPageRoutingModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TodoPage]
})
export class TodoPageModule {}
