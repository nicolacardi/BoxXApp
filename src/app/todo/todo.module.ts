import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { TodoPageRoutingModule } from './todo-routing.module';
import { TodoPage } from './todo.page';

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
    FormsModule,                //AS!!!
    ReactiveFormsModule,        //AS!!!!
    TodoPageRoutingModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TodoPage]
})
export class TodoPageModule {}
