import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup, FormControl } from '@angular/forms';

import { todoEvent, ticket } from 'src/app/models/models';
import { TodoEventsService } from 'src/app/services/todoevents.service';
import { Router } from "@angular/router";
import { TicketService } from '../services/ticket.service';



@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.page.html',
  styleUrls: ['./tickets.page.scss'],
})
export class TicketsPage implements OnInit {

  tickets: ticket[];

  //ticketForms: FormArray = this.fb.array([]);
  loading = true;

  constructor(private router: Router, private fb: FormBuilder, private ticketService: TicketService) {
  }

  ngOnInit() {
    this.ticketService.getTicketList()
    .subscribe(
      res=>   { 
        this.tickets = res as ticket[];
        res.sort((a, b) =>a.n_Ticket < b.n_Ticket ? -1: 1);

        this.loading = false;
     }
    );
  }
  
  ionViewDidEnter() {
    /*
    this.loading = true;
    this.ticketForms.clear();
    this.ticketService.getTicketList().subscribe(
      res => {
        if ( res == [] || res == null || res.length== 0) {
          this.addTicketForm();
          this.loading = false;
        } else {
          //sort per far comparire i todo chiusi sotto, ordinati per data
          //res.sort((a, b) => new Date(b.dt).getTime() - new Date(a.dt).getTime())
          //  .sort((a, b) => a.isClosed < b.isClosed ? -1 : a.isClosed > b.isClosed ? 1 : 0);

          (res as []).forEach((tk: ticket) => {
            this.ticketForms.push(this.fb.group({

              id: [tk.id],
              n_Ticket: [tk.n_Ticket],
              tipoTicket: [tk.tipoTicket],
              statoTicket: [tk.statoTicket],
              data1: [tk.data1]
              //causaleID: number;
              //customerID: number;
              //customer: Customer;
              // poi: string;
            }));
            this.loading = false;
          });
        }
      }
    );
    */
  }

  openDetail(id){
    this.router.navigateByUrl('/ticket-detail/' + id);
  }
}