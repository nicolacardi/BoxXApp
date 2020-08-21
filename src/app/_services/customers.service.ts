import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { currentUser, customer } from '../_models/models';

@Injectable({
  providedIn: 'root'
})

export class CustomersService  {
  currUser: currentUser;

  constructor(private http: HttpClient) {
    
  }

  getCustomersList(): Observable<customer[]>
  {
    //return this.http.get<customer[]>(environment.apiBaseUrl + '/Customers');    

    if(localStorage.getItem('currentUser') != null)
      this.currUser = JSON.parse(localStorage.getItem('currentUser'));

    return this.http.get<customer[]>(environment.apiBaseUrl + '/Customers/GetByUserID/' + this.currUser.userID);
  }

  getCustomer(customerID: number){
    return this.http.get(environment.apiBaseUrl  + '/Customers/' + customerID );
  }
  
}
