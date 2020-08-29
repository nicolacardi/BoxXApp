import { Component, OnInit, Input, ViewChild, AfterContentInit, ElementRef} from '@angular/core';
import { customer } from 'src/app/_models/models';
import { IonCardContent } from '@ionic/angular';

declare var google;

@Component({
  selector: 'app-customer-card',
  templateUrl: './customer-card.component.html',
  styleUrls: ['./../customers.scss'],
})
export class CustomerCardComponent implements OnInit, AfterContentInit {

  accordionExpanded = false;
  map;
  latlng: string;
  latlngA;
  @ViewChild("mapElement", { static: true }) mapelement;

  heightDynamic = 0;
  @Input()
  localCustomer :  customer;

  constructor() {}

  ngOnInit() {
  }

  ngAfterContentInit() : void{
    this.latlng = this.localCustomer.poi;
    if (this.latlng != null) {
      this.latlng = this.latlng.replace(" ", "");
      let latlngA = this.latlng.split(',');
      let lat = parseFloat(latlngA[0]);
      let lng = parseFloat(latlngA[1]);
      this.map = new google.maps.Map(
        this.mapelement.nativeElement,
        {
          center: {lat: lat, lng: lng},
          zoom: 11
        }
      );
    }
  }

  toggleAccordion() {

    if(this.accordionExpanded) {
      this.heightDynamic = 0;
    } else {
      this.heightDynamic = 800;
    }
    this.accordionExpanded = !this.accordionExpanded;
  }

}
