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

    this.objTodo = <todoEvent> {};
    this.todoID = this.route.snapshot.params['id'];

    this.todoEventsService.getTodoEvent(this.todoID).subscribe(
      res => {
        this.objTodo = res as todoEvent;
        this.objTodo.id = this.todoID;
      },
      err=>{
        console.log(err);
      }
    );
  }

  backToTodo() {
    console.log ("backToTodo");
    //this.router.navigateByUrl("todo");
    // onChange(fg: FormGroup) {
    //   if (fg.controls['isClosed'].dirty ||
    //     fg.controls['titolo'].dirty ||
    //     fg.controls['dettagli'].dirty) {
  
    //     this.loading = true;
    //     if (fg.value.id == 0) {
    //       //Insert
    //       this.todoEventsService.postTodoEvent(fg.value).subscribe(
    //         (res: any) => {
    //           //console.log("OK INSERT");
    //           fg.patchValue({ id: res.id });     ///riporto l'id generato dall'insert
    //           fg.reset(fg.value);
    //           //this.showNotification('insert');
    //         },
    //         err => {
    //           console.log(err);
    //         });
    //     }
    //     else {
    //       //Update
    //       this.todoEventsService.putTodoEvent(fg.value).subscribe(
    //         (res: any) => {
    //           fg.reset(fg.value);
    //           //this.showNotification('update');
    //         });
    //     }
    //     this.loading = false;
    //   }
    // }
  }
}
