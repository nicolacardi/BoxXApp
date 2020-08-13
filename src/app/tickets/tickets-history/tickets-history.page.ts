import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TicketService } from 'src/app/services/ticket.service';
import { ticket } from 'src/app/models/models';

@Component({
  selector: 'app-ticket-history',
  templateUrl: './tickets-history.page.html',
  styleUrls: ['./../tickets.scss'],
})
export class TicketsHistoryPage implements OnInit {

  tickets: ticket[];
  loading = true;

  constructor(private router: Router,  private ticketService: TicketService) { }

  ngOnInit() {
    this.ticketService.getTicketHistory()
    .subscribe(
      res=>   { 
        this.tickets = res as ticket[];
        res.sort((a, b) =>a.n_Ticket < b.n_Ticket ? -1: 1);

        this.loading = false;
     }
    );
  }

  openDetail(id, slideitem){
    slideitem.close();
    this.router.navigateByUrl('/ticket-detail/' + id);
  }

  openDefault(id){
    this.router.navigateByUrl('/ticket-detail/' + id);
  }

}
