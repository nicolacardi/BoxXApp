import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoEventsService } from '../services/todoevents.service';
import { todoEvent } from '../models/models';
import { stringify } from 'querystring';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.page.html',
  styleUrls: ['./todo-detail.page.scss'],
})
export class TodoDetailPage implements OnInit {

  constructor(private route: ActivatedRoute, private todoEventsService: TodoEventsService, private router: Router) { }
  public objTodo: todoEvent;
  todoID: any;


  ngOnInit() {
    this.objTodo = <todoEvent>{};
    this.todoID = this.route.snapshot.params['id'];
    this.todoEventsService.getTodoEvent(this.todoID).subscribe(
      res => {
        this.objTodo = res as todoEvent;
        this.objTodo.id = this.todoID;
      },
      err => {
        console.log(err);
      }
    );
  }

  backToTodo() {
    // console.log (JSON.stringify(this.objTodo));
    this.objTodo.id = +this.objTodo.id;
    if (this.todoID == 0) {

      //Insert
      this.todoEventsService.postTodoEvent(this.objTodo).subscribe(
        (res: any) => {
          // fg.patchValue({ id: res.id });     ///riporto l'id generato dall'insert
          // console.log ("inserito");
        },
        err => {
          console.log(err);
        });
    }
    else {
      //Update
      this.todoEventsService.putTodoEvent(this.objTodo).subscribe(
        (res: any) => {
          // console.log ("aggiornato");
        },
        err => {
          console.log(err);
        }
        );
    }
    this.router.navigateByUrl("todo");
  }
}