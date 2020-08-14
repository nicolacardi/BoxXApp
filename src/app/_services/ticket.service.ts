import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ticket, currentUser } from '../_models/models';

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
  }

  getTicketHistory(): Observable<ticket[]> {
    if (localStorage.getItem('currentUser') != null)
      this.currUser = JSON.parse(localStorage.getItem('currentUser'));

    return this.http.get<ticket[]>(environment.apiBaseUrl + '/Ticket/GetHistoryByTecnicoID/' + this.currUser.userID);
  }
}


