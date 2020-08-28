import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../../_services/customers.service';
import { customer } from 'src/app/_models/models';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.page.html',
  styleUrls: ['./../customers.scss'],
})
export class CustomersListPage implements OnInit {


  customers: customer[];
  loading = true;

  constructor(
    public serviceCustomer: CustomersService

  ) { }

  ngOnInit() {

    this.serviceCustomer.getCustomersList()
    .subscribe(
      res => {
        this.customers = res as customer[];
        this.loading = false;
      }
    );


  }

}
