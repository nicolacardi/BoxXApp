import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { missionCausale } from '../_models/models';

@Injectable({
  providedIn: 'root'
})

export class MissionCausaliService  {
  
  constructor(private http: HttpClient) {
    
  }

  getCausaliList(): Observable<missionCausale[]>
  {
    return this.http.get<missionCausale[]>(environment.apiBaseUrl + '/MissionCausali');     
  }
}


 