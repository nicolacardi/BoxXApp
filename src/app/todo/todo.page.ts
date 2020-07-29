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
  loading = true;
  detailClicked = false;

  tmpID=0;

  titoloChanged: any;

  constructor(private router: Router, private fb: FormBuilder, private todoEventsService: TodoEventsService) {
  }

  ngOnInit() {
  }
  
  ionViewDidEnter() {
    this.loading = true;
    this.todoEventsForms.clear();
    this.todoEventsService.getTodoEventList().subscribe(
      res => {
        if ( res == [] || res == null || res.length== 0) {
          this.addTodoEventsForm();
          this.loading = false;
        } else {
          //sort per far comparire i todo chiusi sotto, ordinati per data
          res.sort((a, b) => new Date(b.dt).getTime() - new Date(a.dt).getTime())
            .sort((a, b) => a.isClosed < b.isClosed ? -1 : a.isClosed > b.isClosed ? 1 : 0);

          (res as []).forEach((todo: todoEvent) => {
            this.todoEventsForms.push(this.fb.group({

              id: [todo.id],
              userID: [todo.userID],
              titolo: [todo.titolo],
              dettagli: [todo.dettagli],
              isClosed: [todo.isClosed],
              dt: [todo.dt]
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


  addTodoEventsForm() {
    //this.todoEventsForms.push(this.fb.group({         //per aggiungere in coda
    this.todoEventsForms.insert(0, this.fb.group({
      id: [0],
      userID: [''],
      causaleID: [0],
      ticketID: [0],

      titolo: ['', Validators.required],
      dettagli: ['', Validators.required],
      isClosed: false,
      dt : [null],
      //dt : [0, Validators.min(1)],
      //h_Ini : ['', Validators.required]
    }))
  }

  onLeave(id){
    //this.tmpID = id;
  }

  onClick(id, i){

    if(id == 0 ) 
      this.detailClicked= true;
    else
      this.router.navigateByUrl('/todo-detail/' + id);
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

    //console.log("onChange");
    //console.log(this.tmpID);

    if (fg.controls['isClosed'].dirty ||
      fg.controls['titolo'].dirty ||
      fg.controls['dettagli'].dirty) {

      this.loading = true;

      if (fg.value.id == 0) {
        //Insert
        this.todoEventsService.postTodoEvent(fg.value).subscribe(
          (res: any) => {
            //this.tmpID = res.id;
            //console.log("onChange - after Post");
            //console.log(this.tmpID);

            fg.patchValue({ id: res.id });     ///riporto l'id generato dall'insert
            fg.reset(fg.value);
            //this.showNotification('insert');
   
            if(this.detailClicked){
              this.router.navigateByUrl('/todo-detail/' + res.id);
              this.detailClicked=false;
            }
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
      this.tmpID=0;
    }
  }


  getName(i) {
    return this.getControls()[i].value.name;
  }

  getControls() {
    return (<FormArray>this.todoEventsForms.get('id')).controls;
  }
}