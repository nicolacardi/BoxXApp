import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { currency } from '../_models/models';

@Injectable({
  providedIn: 'root'
})

export class CurrenciesService  {
  
  constructor(private http: HttpClient) {
    
  }

  getCurrenciesList(): Observable<currency[]>
  {
    return this.http.get<currency[]>(environment.apiBaseUrl + '/Currencies');     
  }
}
