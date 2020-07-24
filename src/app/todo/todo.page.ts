import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup, FormControl } from '@angular/forms';

import { todoEvent } from 'src/app/models/models';
import { TodoEventsService } from 'src/app/services/todoevents.service';
import { Router } from "@angular/router";


@Component({
  selector: 'app-todo',
  templateUrl: './todo.page.html',
  styleUrls: ['./todo.page.scss'],
})
export class TodoPage implements OnInit {

  todoEventsForms: FormArray = this.fb.array([]);

  //todoEvents: todoEvent[];
  loading = true;

  titoloChanged: any;

  // public todoFormGroup: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private todoEventsService: TodoEventsService) {

    //  this.todoFormGroup = fb.group({
    //   id: [0],
    //   userID: [''],
    //   causaleID: [0],
    //   ticketID: [0],

    //   titolo: ['', Validators.required],
    //   dettagli: ['', Validators.required],
    //   isClosed: false
    //  })
    
  }

  ngOnInit() {

/*    
  this.form = this.fb.group({
    id: [0],
    userID: [''],
    causaleID: [0],
    ticketID: [0],

    titolo: ['', Validators.required],
    dettagli: ['', Validators.required],
    isClosed: false
  });
*/
    //console.log("Inizio todo.page.ts");

    this.todoEventsService.getTodoEventList().subscribe(
      res => {
        if (res == [])
          this.addTodoEventsForm();
        else {
          //sort per far comparire i todo chiusi sotto
          res.sort((a, b) => a.isClosed < b.isClosed ? -1 : a.isClosed > b.isClosed ? 1 : 0);

          console.log(JSON.stringify(res));
          console.log("------------------------");
          /*
          his.myForm = formBuilder.group({
              firstName: ['value'],
              lastName: ['value', *validation function goes here*],
              age: ['value', *validation function goes here*, *asynchronous validation function goes here*]
          });  
          */
          (res as []).forEach((todo: todoEvent) => {
            this.todoEventsForms.push(this.fb.group({

              id: [todo.id],
              userID: [todo.userID],
              titolo: [todo.titolo],
              dettagli: [todo.dettagli],
              isClosed: [todo.isClosed]
              //dt: Date;
              //h_Ini: Date;
              //causaleID: number;
              //ticketID: number;
              //objTicket: ticket;
            }));
            this.loading = false;
          });
        }
      }
    );
  }
  logForm() {
    console.log("aaa");
  }

  addTodoEventsForm() {
    //this.todoEventsForms.push(this.fb.group({         //per aggiungere in coda
    this.todoEventsForms.insert(0, this.fb.group({
      id: [0],
      userID: [''],
      causaleID: [0],
      ticketID: [0],

      titolo: ['', Validators.required],
      dettagli: ['', Validators.required],
      isClosed: false
      //dt : [0, Validators.min(1)],
      //h_Ini : ['', Validators.required]
    }))
  }

  onDelete(id, i) {
    if (id == 0)
      this.todoEventsForms.removeAt(i);
    else if (confirm('Si conferma la cancellazione del record ?'))
      this.todoEventsService.deleteTodoEvent(id).subscribe(
        res => {
          this.todoEventsForms.removeAt(i);
          //this.showNotification('delete');
        });
  }
  onChange(fg: FormGroup) {
    if (fg.controls['isClosed'].dirty ||
      fg.controls['titolo'].dirty ||
      fg.controls['dettagli'].dirty) {

      this.loading = true;
      if (fg.value.id == 0) {
        //Insert
        this.todoEventsService.postTodoEvent(fg.value).subscribe(
          (res: any) => {
            //console.log("OK INSERT");
            fg.patchValue({ id: res.id });     ///riporto l'id generato dall'insert
            fg.reset(fg.value);
            //this.showNotification('insert');
          },
          err => {
            console.log(err);
          });
      }
      else {
        //Update
        this.todoEventsService.putTodoEvent(fg.value).subscribe(
          (res: any) => {
            fg.reset(fg.value);
            //this.showNotification('update');
          });
      }
      this.loading = false;
    }
  }

}

 

 