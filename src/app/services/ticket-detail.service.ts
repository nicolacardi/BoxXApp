import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ticketDetail } from '../models/models';

@Injectable({
  providedIn: 'root'
})

export class TicketDetailService {

  formData:ticketDetail;
  ticketID: number;
  ticketList: ticketDetail[];

  constructor(private http: HttpClient) {
  
  }

  public InitFormData(){
    this.formData ={
      id: 0,
      ticketID: 0,
      causaleID: 0,
      causale:null,
      dt: null,
      h_Ini: null,
      h_End: null,
      note: null
    }
  }

  getTicketDetailList(ticketID): Observable<ticketDetail[]>
  {
    this.ticketID = ticketID;
    return this.http.get<ticketDetail[]>(environment.apiBaseUrl + '/TicketDetails/GetByTicketID/' + ticketID); 
  }

  postTicketDetail(){
    this.formData.ticketID = +this.formData.ticketID;
    return this.http.post( environment.apiBaseUrl   + '/TicketDetails',this.formData)  
  }  
  
  putTicketDetail(){
    this.formData.ticketID = +this.formData.ticketID;
    return this.http.put( environment.apiBaseUrl  + '/TicketDetails/' + this.formData.id , this.formData)    
  }

  deleteTicketDetail(  id  ){
    return this.http.delete(  environment.apiBaseUrl  + '/TicketDetails/' + id ) ;
  }

  refreshList(ticketID)
  {
    //console.log("RefreshList");

    this.ticketID = ticketID;
    this.http.get(environment.apiBaseUrl+ '/TicketDetails/GetByTicketID/' + ticketID)
      .toPromise()            //AS ???
      .then(res => {
        this.ticketList = res as ticketDetail[] 
      },
      err => {
        console.log(err); 
      }
    );
  }

}


     
