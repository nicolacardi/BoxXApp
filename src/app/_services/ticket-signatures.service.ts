import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { ticketSignature, currentUser } from '../_models/models';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TicketSignaturesService {

  
  formData:ticketSignature;
  ticketID: number;
  
  constructor(private http: HttpClient) {} 

  public InitFormData(){
    this.formData ={
      id: 0,
      ticketID: 0,
      signature:null,
      dtIns: null
    }
  }

  getSignature(ID:number) {
    return this.http.get(environment.apiBaseUrl + '/TicketSignatures/' + ID);
  }

  getSignatureByTicketID(ticketID:number) {
    //api/TicketSignatures/GetByTicketID/5
    return this.http.get(environment.apiBaseUrl + '/TicketSignatures/GetByTicketID/' + ticketID);
  }

  postSignature(){
    this.formData.ticketID = +this.formData.ticketID;
    return this.http.post( environment.apiBaseUrl   + '/TicketSignatures',this.formData)  
  }  
  
  putSignature(){
    this.formData.id = +this.formData.id;
    this.formData.ticketID = +this.formData.ticketID;
    
    return this.http.put( environment.apiBaseUrl  + '/TicketSignatures/' + this.formData.id , this.formData)    
  }

  deleteSignature(  id  ){
    return this.http.delete(  environment.apiBaseUrl  + '/TicketSignatures/' + id ) ;
  }
 
}
