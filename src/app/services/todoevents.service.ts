import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { todoEvent, currentUser } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class TodoEventsService {
  currUser: currentUser;
 
  constructor(private http: HttpClient) {
    
  }

  getTodoEventList(): Observable<todoEvent[]>
  {
    if(localStorage.getItem('currentUser') != null)
      this.currUser = JSON.parse(localStorage.getItem('currentUser'));

    return this.http.get<todoEvent[]>(environment.apiBaseUrl + '/TodoEvents/GetByUserID/' + this.currUser.userID);

    //TEMPORANEO niente filtro per utente):
    //return this.http.get<todoEvent[]>(environment.apiBaseUrl + '/TodoEvents/');     
  }

  getTodoEvent(todoEvent: number){
    return this.http.get(environment.apiBaseUrl  + '/TodoEvents/' + todoEvent );
  }

  //AS: metodo di passaggio dati come parametro (in alternativa ad avere una variabile formData sul servizio -->  vedi TicketDetailService)
  postTodoEvent(formData){
    //console.log(JSON.stringify(formData));
    this.currUser = JSON.parse(localStorage.getItem('currentUser'));
    formData.userID = this.currUser.userID;
    formData.ticketID = +formData.ticketID;       //forzo la conversione su tipo number
    return this.http.post( environment.apiBaseUrl   + '/TodoEvents',formData)  
  }  
  
  putTodoEvent(formData){
    //console.log(JSON.stringify(formData));
    if(formData.userID == null || formData.userID =="" ){
      this.currUser = JSON.parse(localStorage.getItem('currentUser'));
      formData.userID = this.currUser.userID;
    }
    formData.ticketID = +formData.ticketID;
    return this.http.put( environment.apiBaseUrl  + '/TodoEvents/' + formData.id , formData)    
  }

  deleteTodoEvent(id:number){
    return this.http.delete(  environment.apiBaseUrl  + '/TodoEvents/' + id ) ;
  }
}
