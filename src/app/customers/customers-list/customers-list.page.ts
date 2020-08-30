import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../../_services/customers.service';
import { customer } from 'src/app/_models/models';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.page.html',
  styleUrls: ['./../customers.scss'],
})
export class CustomersListPage implements OnInit {


  customers: customer[];
  public currentID: number;

  loading = true;


  constructor(
    public route: ActivatedRoute,
    public serviceCustomer: CustomersService ) { 

  }

  ngOnInit() {

    this.currentID = this.route.snapshot.params['id'];

    //console.log("Current ID: " ,this.currentID);

    this.serviceCustomer.getCustomersList()
    .subscribe(
      res => {
        this.customers = res as customer[];

        //mi posiziono sul currentID, se != 0
        if(this.currentID != 0){
          
        }

        this.loading = false;
      }
    );
  }

}
