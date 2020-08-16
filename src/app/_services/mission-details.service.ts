import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { missionDetail } from '../_models/models';

@Injectable({
  providedIn: 'root'
})

export class MissionDetailsService {

  formData: missionDetail;
  missionID: number;
  detailList: missionDetail[];

  constructor(private http: HttpClient) {
  
  }

  public InitFormData(){
    this.formData ={
      id: 0,
      missionID: 0,

      causaleID: 0,
      objCausale:null,

      valutaID: 0,
      objValuta:null,

      ticketID: 0,
      objTicket:null,

      tipoPagamento:null,
      importo: 0,
      dt: null,
      stato: null,
      note: null,

      dtIns: null,
      dtSub: null,
      dtClosed: null
    }
  }
   


  getMissionDetailList(missionID): Observable<missionDetail[]>
  {
    this.missionID = missionID;
    return this.http.get<missionDetail[]>(environment.apiBaseUrl + '/MissionDetails/GetByMissionID/' + missionID); 
  }

  postMissionDetail(){

    this.formData.missionID = +this.formData.missionID;
    this.formData.causaleID = +this.formData.causaleID;
    this.formData.valutaID = +this.formData.valutaID;

    return this.http.post( environment.apiBaseUrl   + '/MissionDetails',this.formData)  
  }  
  
  putMissionDetail(){
    this.formData.id = +this.formData.id;
    this.formData.missionID = +this.formData.missionID;
    
    return this.http.put( environment.apiBaseUrl  + '/MissionDetails/' + this.formData.id , this.formData)    
  }

  deleteMissionDetail(  id  ){
    return this.http.delete(  environment.apiBaseUrl  + '/MissionDetails/' + id ) ;
  }

  refreshList(missionID)
  {
    //console.log("RefreshList");

    this.missionID = missionID;
    this.http.get(environment.apiBaseUrl+ '/MissionDetails/GetByMissionID/' + missionID)
      .toPromise()            //AS ???
      .then(res => {
        this.detailList = res as missionDetail[] 
      },
      err => {
        console.log(err); 
      }
    );
  }

}


     
