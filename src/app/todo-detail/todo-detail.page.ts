import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.page.html',
  styleUrls: ['./todo-detail.page.scss'],
})
export class TodoDetailPage implements OnInit {

  constructor(private route: ActivatedRoute,) { }
  todoID: any;
  ngOnInit() {
    this.todoID = this.route.snapshot.params['id'];
  }

}
