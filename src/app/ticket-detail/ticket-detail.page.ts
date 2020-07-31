import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ticket } from '../models/models';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.page.html',
  styleUrls: ['./ticket-detail.page.scss'],
})
export class TicketDetailPage implements OnInit {

  constructor(private route: ActivatedRoute) { }
  public objTicket: ticket;
  ticketID: any;
  ngOnInit() {
    this.ticketID = this.route.snapshot.params['id'];
  }

}
