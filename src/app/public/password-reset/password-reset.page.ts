import { Component, OnInit, ElementRef } from '@angular/core';
import {ViewChild} from '@angular/core'
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.page.html',
  styleUrls: ['./../public.page.scss'],
})
export class PasswordResetPage implements OnInit {

  @ViewChild('emailRef', { static: false }) emailRef: ElementRef;
  @ViewChild('emailLabel', { static: false }) emailLabel: ElementRef;
  
  

  constructor(private router: Router, public toastController: ToastController) { }

  ngOnInit() {

  }

  onSubmit() {
    //Grazie! Verifica sss.aaa@gmail.com per ottenere un link per reimpostare la tua password.
     
    //let input = document.getElementById('emailRef').getElementsByTagName('input')[0];
    //this.emailRef.nativeElement
    /*
    console.log(this.emailLabel.nativeElement.innerText);
    let tmpEmail = this.emailLabel.nativeElement.innerText ;
    console.log(tmpEmail);
    
    let tmpEmailRef = this.emailRef.nativeElement.innerText ;
    console.log(tmpEmailRef);
    */

    //this.ShowMessage('Grazie! Verifica ' + tmpEmailRef + ' per ottenere un link per reimpostare la tua password', 'Operazione effettuata', 'primary');
    this.ShowMessage('Grazie! Verifica la tua eMail per ottenere un link e reimpostare la tua password', 'Operazione effettuata', 'primary');

    this.router.navigateByUrl('/login');
    // TODO: invio email !
    
  }

  async ShowMessage(msg: string, titolo?: string, colore?: string) {
    var mColor = colore;
    if(mColor== null)
      mColor='primary';

    const toast = await this.toastController.create({
      message: msg,
      color: mColor,
      duration: 2000,
      showCloseButton: true,  
      closeButtonText: 'OK',  
    });
    toast.present();
  }

  // inviaMail(){
  //   const sgMail = require('@sendgrid/mail');
  //   sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  //   const msg = {
  //     to: 'test@example.com',
  //     from: 'test@example.com',
  //     subject: 'Sending with Twilio SendGrid is Fun',
  //     text: 'and easy to do anywhere, even with Node.js',
  //     html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  //   };
  //   sgMail.send(msg);
  // }
}
