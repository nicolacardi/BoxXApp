import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ticket, currentUser } from '../models/models';

@Injectable({
  providedIn: 'root'
})

export class TicketService {
  currUser: currentUser;

  constructor(private http: HttpClient) { }

  getTicket(ticket: string) {
    return this.http.get(environment.apiBaseUrl + '/Ticket/' + ticket);
  }

  getTicketList(): Observable<ticket[]> {
    if (localStorage.getItem('currentUser') != null)
      this.currUser = JSON.parse(localStorage.getItem('currentUser'));

    return this.http.get<ticket[]>(environment.apiBaseUrl + '/Ticket/GetByTecnicoID/' + this.currUser.userID);
    //http://188.152.211.199/iQWApi/api/Ticket/GetByTecnicoID/75b01815-1282-4459-bbf5-61bc877a9100

    //return this.http.get<ticket[]>(environment.apiBaseUrl + '/Ticket?badge=' + this.currUser.badge);
    //http://188.152.211.199/iQWApi/api/Ticket?badge=666

  }
  getTicketHistory(): Observable<ticket[]> {
    if (localStorage.getItem('currentUser') != null)
      this.currUser = JSON.parse(localStorage.getItem('currentUser'));

    return this.http.get<ticket[]>(environment.apiBaseUrl + '/Ticket/GetHistoryByTecnicoID/' + this.currUser.userID);

    //http://188.152.211.199/iQWApi/api/Ticket/GetHistoryByTecnicoID/75b01815-1282-4459-bbf5-61bc877a9100
  }
}


