
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { todoEvent, currentUser, rimborso } from '../models/models';

@Injectable({
  providedIn: 'root'
})

export class RimborsiService {
  currUser: currentUser;
 
  constructor(private http: HttpClient) {
    
  }

  getRimborsiList(): Observable<rimborso[]>
  {
    if(localStorage.getItem('currentUser') != null)
      this.currUser = JSON.parse(localStorage.getItem('currentUser'));

    return this.http.get<rimborso[]>(environment.apiBaseUrl + '/Rimborsi/GetByUserID/' + this.currUser.userID);
  }

  getRimbors(rimborso: number){
    return this.http.get(environment.apiBaseUrl  + '/Rimborsi/' + rimborso );
  }

  //AS: metodo di passaggio dati come parametro (in alternativa ad avere una variabile formData sul servizio -->  vedi TicketDetailService)
  postTodoEvent(formData){
    //console.log(JSON.stringify(formData));
    this.currUser = JSON.parse(localStorage.getItem('currentUser'));
    formData.userID = this.currUser.userID;
    formData.ticketID = +formData.ticketID;       //forzo la conversione su tipo number
    return this.http.post( environment.apiBaseUrl   + '/Rimborsi',formData)  
  }  
  
  putTodoEvent(formData){
    //console.log(JSON.stringify(formData));
    if(formData.userID == null || formData.userID =="" ){
      this.currUser = JSON.parse(localStorage.getItem('currentUser'));
      formData.userID = this.currUser.userID;
    }
    formData.ticketID = +formData.ticketID;
    return this.http.put( environment.apiBaseUrl  + '/Rimborsi/' + formData.id , formData)    
  }

  deleteTodoEvent(id:number){
    return this.http.delete(  environment.apiBaseUrl  + '/Rimborsi/' + id ) ;
  }
}
