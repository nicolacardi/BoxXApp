
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { environment } from 'src/environments/environment';
import {  currentUser, mission } from '../models/models';
import { JsonPipe } from '@angular/common';
import { catchError, map } from 'rxjs/operators';


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
      'dtIns': null,
      'dtSub': null,
      'dtClosed': null
    };

    // this.formData.id=0;
    // this.formData.userID= this.currUser.userID;
    // this.formData.descrizione=null;
    // this.formData.stato = "I";
    // this.formData.valutaID =1;
    // this.formData.dtIns = null;
    // this.formData.dtSub = null;
    // this.formData.dtClosed = null;
    
/*
    let newMission = {
      "id": 0,
      "userID": this.currUser.userID,
      "descrizione": null,
      "stato": "I",
      "valutaID": 1,
      "dtIns": null,
      "dtSub": null,
      "dtClosed": null
    } ;
*/
    //console.log("DEBUG: " ,environment.apiBaseUrl   + '/Missions/' , this.formData );
    //return this.http.post( environment.apiBaseUrl   + '/Missions' , this.currUser.userID );
    //{responseType: 'text' }
    //let test_this = { 'id': 0,  'userID': "75b01815-1282-4459-bbf5-61bc877a9100", 'stato': "I", 'valutaID': 1 };
    //console.log("DEBUG:  test_this" ,JSON.stringify(test_this) );
    // return this.http.post( environment.apiBaseUrl   + '/Missions' ,JSON.stringify( test_this), httpOptions);
    //return this.http.post<mission>(environment.apiBaseUrl   + '/Missions', newMission, httpOptions)
    //return this.http.post(environment.apiBaseUrl   + '/Missions', this.currUser.userID, httpOptions);
    /*
    .pipe(
      catchError(this.handleError)
    );
*/
                    //https://www.youtube.com/watch?v=74X18AoZ2Gk
                    // let mypostData = {
                    //   test: 'miodato'
                    // }
                    
                    // let myURL = 'http://httpbin.org/post';
                    // this.http.post(myURL, mypostData).toPromise().then( (data:any) => {
                    //   console.log(data);
                    //   let myjson=data.json;
                    // });

  // return this.http.post(environment.apiBaseUrl+ '/Missions', this.formData).toPromise().then( data => {
  //   console.log("RITORNO DA PROMISE:",data);
  // });
  //   console.log("FINITO");
  return this.http.post(environment.apiBaseUrl+ '/Missions', this.formData).subscribe(
    res   => {
      console.log(res);
    }
  );
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
