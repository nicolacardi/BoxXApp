import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ticket, ticketDetail, ticketCausale } from '../models/models';
import { FormBuilder, FormArray } from '@angular/forms';

import { TicketService } from '../services/ticket.service';
import { TicketDetailService } from '../services/ticket-detail.service';
import { TicketCausaliService } from '../services/ticket-causali.service';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.page.html',
  styleUrls: ['./ticket-detail.page.scss'],
})
export class TicketDetailPage implements OnInit {

  constructor(private route: ActivatedRoute, private fb: FormBuilder
    , public serviceTicket: TicketService
    , public serviceTicketDetails: TicketDetailService
    , public serviceTicketCausali: TicketCausaliService) { }

  loading = true;

  public objTicket: ticket;
  ticketID: any;
  ticketDetails: ticketDetail[];
  ticketCausali: ticketCausale[];

  ticketDetailsForms: FormArray = this.fb.array([]);

  ngOnInit() {
    //init oggetto
    if (this.objTicket == null) {
      this.objTicket = {
        id: 0,
        n_Ticket: null,
        tipoTicket: null,
        statoTicket: null,
        data1: null,

        badge: null,
        customerID: 0,
        customer: null,
        poi: null
      }
    }

    this.ticketID = this.route.snapshot.params['id'];

    this.serviceTicketCausali.getCausaliList()
      .subscribe(
        res => this.ticketCausali = res as ticketCausale[]
      );

    this.serviceTicket.getTicket(this.ticketID)
      .subscribe(
        res => {
          this.objTicket = res as ticket;
          this.loading = false;
        }
      );

    this.serviceTicketDetails.getTicketDetailList(this.ticketID)
      .subscribe(
        res => {
          this.ticketDetails = res as ticketDetail[];
        }
      );

    this.ticketDetailsForms.clear();
    this.serviceTicketDetails.getTicketDetailList(this.ticketID).subscribe(
      res => {
        if (res == [] || res == null || res.length == 0) {
          this.addTicketDetailForm();
          this.loading = false;
        } else {
          //sort per far comparire i todo chiusi sotto, ordinati per data
          //res.sort((a, b) => new Date(b.dt).getTime() - new Date(a.dt).getTime())
          //  .sort((a, b) => a.isClosed < b.isClosed ? -1 : a.isClosed > b.isClosed ? 1 : 0);

          (res as []).forEach((detail: ticketDetail) => {
            this.ticketDetailsForms.push(this.fb.group({
              id: [detail.id],
              ticketID: [detail.ticketID],
              causaleID: [detail.causaleID],
              //causale!!!!
              dt: [detail.dt],
              h_Ini: [detail.h_Ini],
              h_End: [detail.h_End],
              note: [detail.note]

            }));
            this.loading = false;
          });
        }
      }
    );
  }


  addTicketDetailForm() {
    /*
    this.ticketDetailForms.insert(0, this.fb.group({
      id: [0],
      userID: [''],
      causaleID: [0],
      ticketID: [0],

      titolo: ['', Validators.required],
      dettagli: ['', Validators.required],
      isClosed: false,
      dt : [null],
      //dt : [0, Validators.min(1)],
      //h_Ini : ['', Validators.required]
    }))
    */
  }

}
