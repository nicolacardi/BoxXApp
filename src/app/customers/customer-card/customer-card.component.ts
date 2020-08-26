import { Component, OnInit, Input} from '@angular/core';
import { customer } from 'src/app/_models/models';
import { IonCardContent } from '@ionic/angular';

@Component({
  selector: 'app-customer-card',
  templateUrl: './customer-card.component.html',
  styleUrls: ['./../customers.scss'],
})
export class CustomerCardComponent implements OnInit {

  accordionExpanded = false;

  // @ViewChild("cardContentDOM", { static: false }) cardContent: ElementRef;
  heightDynamic = 0;
  @Input()
  localCustomer :  customer;

  constructor() {}

  ngOnInit() {
    //console.log (this.cardContent);
  }


  toggleAccordion() {

    if(this.accordionExpanded) {
      this.heightDynamic = 0;
    } else {
      this.heightDynamic = 500;
    }
    this.accordionExpanded = !this.accordionExpanded;
  }

}
