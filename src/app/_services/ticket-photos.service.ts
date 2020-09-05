import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { ticketPhoto, currentUser } from '../_models/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketPhotosService {

  formData:ticketPhoto;
  ticketID: number;

  constructor(private http: HttpClient) {} 

  getPhoto(photoID: string) {
    //GET: api/TicketPhotos/5
    return this.http.get(environment.apiBaseUrl + '/TicketPhotos/' + photoID);
  }

  getPhotosList(ticketID): Observable<ticketPhoto[]>
  {
    // GET: api/TicketPhotos/GetByTicketID/5
    this.ticketID = ticketID;
    return this.http.get<ticketPhoto[]>(environment.apiBaseUrl + '/TicketPhotos/GetByTicketID/' + ticketID); 
    
    //ATTENZIONE: TEMPORANEO!!!!
    //return this.http.get<ticketPhoto[]>(environment.apiBaseUrl + '/TicketPhotos' ); 
    
  }

  postPhoto(){
    this.formData.ticketID = +this.formData.ticketID;
    return this.http.post( environment.apiBaseUrl   + '/TicketPhotos',this.formData)  
  }  
  
  putPhoto(){
    this.formData.id = +this.formData.id;
    this.formData.ticketID = +this.formData.ticketID;
    
    return this.http.put( environment.apiBaseUrl  + '/TicketPhotos/' + this.formData.id , this.formData)    
  }

  deletePhoto(  id  ){
    return this.http.delete(  environment.apiBaseUrl  + '/TicketPhotos/' + id ) ;
  }
}
