
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { environment } from 'src/environments/environment';
import {  currentUser, mission } from '../_models/models';
import { formatDate } from '@angular/common';


@Injectable({
  providedIn: 'root'
})

export class MissionService {
  currUser: currentUser;
 
  formData: mission;
  
  constructor(private http: HttpClient) {
    
  }

  getMissionsList(): Observable<mission[]>
  {
    if(localStorage.getItem('currentUser') != null)
      this.currUser = JSON.parse(localStorage.getItem('currentUser'));

    return this.http.get<mission[]>(environment.apiBaseUrl + '/missions/GetByUserID/' + this.currUser.userID);
  }

  getMission(mission: number){
    return this.http.get(environment.apiBaseUrl  + '/Missions/' + mission );
  }

  postMission(){

    this.currUser = JSON.parse(localStorage.getItem('currentUser'));

    this.formData ={
      'id': 0,
      'userID': this.currUser.userID,
      'descrizione': null,
      'stato':"I",
      'valutaID': 1,
      'dtIns': new Date() ,
      'dtSub': null,
      'dtClosed': null
    };
      
    // return this.http.post(environment.apiBaseUrl+ '/Missions', this.formData).toPromise().then( data => {
    //   console.log("RITORNO DA PROMISE:",data);
    // });
    // return this.http.post(environment.apiBaseUrl+ '/Missions', this.formData).subscribe(
    //   res   => {
    //     console.log(res);
    //   }
    // );

    //AS
    return this.http.post(environment.apiBaseUrl+ '/Missions', this.formData);

    /*
      .pipe(
        catchError(this.handleError('postMission'))
      );
      */
  }  
 

  putMission(formData){
    //console.log(JSON.stringify(formData));
    if(formData.userID == null || formData.userID =="" ){
      this.currUser = JSON.parse(localStorage.getItem('currentUser'));
      formData.userID = this.currUser.userID;
    }
    formData.missionID = +formData.missionID;
    return this.http.put( environment.apiBaseUrl  + '/Missions/' + formData.id , formData)    
  }


  confirmMission(formData){
    if(formData.userID == null || formData.userID =="" ){
      this.currUser = JSON.parse(localStorage.getItem('currentUser'));
      formData.userID = this.currUser.userID;
    }
    formData.missionID = +formData.missionID;
    formData.stato = 'S';
    return this.http.put( environment.apiBaseUrl  + '/Missions/' + formData.id , formData)
  }
  
  /*
  confirmMission(id:number){
    //{ "op": "replace", "path": "/stato", "value": “S” },

    var patchformData ={
      'id': id,
      'stato':"I",
      'dtSub': new Date() 
    };

    return this.http.patch( environment.apiBaseUrl  + '/Missions/' + id , patchformData);
    //return this.http.get<ticketDetail[]>(environment.apiBaseUrl + '/TicketDetails/GetByTicketID/' + ticketID); 
  }
*/
  deleteMission(id:number){
    return this.http.delete(  environment.apiBaseUrl  + '/Missions/' + id ) ;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
