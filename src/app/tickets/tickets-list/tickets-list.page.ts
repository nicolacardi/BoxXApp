import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from "@angular/router";
import { AlertController } from '@ionic/angular';

import { todoEvent, ticket } from 'src/app/_models/models';
import { TicketService } from '../../_services/ticket.service';

@Component({
  selector: 'app-tickets-list',
  templateUrl: './tickets-list.page.html',
  styleUrls: ['./../tickets.scss'],
})
export class TicketsListPage implements OnInit {

  tickets: ticket[];
  loading = true;

  constructor(private router: Router,
    private fb: FormBuilder,
    private ticketService: TicketService,
    public alertController: AlertController) {
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
  
  async closeTicket() {
    const alert = await this.alertController.create({
      header: 'CHIUSURA TICKET',
      message: 'Si desidera chiudere il ticket?<br/>(operazione irreversibile)',
      buttons: ['NO', 'CHIUDI IL TICKET']
    });
    await alert.present();
  }

  openDetail(id, slideitem){
    slideitem.close();
    this.router.navigateByUrl('/ticket-detail/' + id);
  }
  openDefault(id){
    this.router.navigateByUrl('/ticket-detail/' + id);
  }

}