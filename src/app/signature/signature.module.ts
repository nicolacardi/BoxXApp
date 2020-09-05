import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignaturePageRoutingModule } from './signature-routing.module';
import { SignaturePadModule } from 'angular2-signaturepad';
import { SignaturePage } from './signature.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignaturePadModule,
    SignaturePageRoutingModule
  ],
  declarations: [SignaturePage]
})
export class SignaturePageModule {}
