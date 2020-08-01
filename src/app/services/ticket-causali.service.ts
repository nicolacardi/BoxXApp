import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ticketCausale } from '../models/models';

@Injectable({
  providedIn: 'root'
})

export class TicketCausaliService  {
  
  constructor(private http: HttpClient) {
    
  }

  getCausaliList(): Observable<ticketCausale[]>
  {
    return this.http.get<ticketCausale[]>(environment.apiBaseUrl + '/TicketCausali');     
  }
}


 