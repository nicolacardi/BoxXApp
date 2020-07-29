import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { ToastController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthenticationService } from "../../services/authentication.service";
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['../public.page.scss'],
})

export class RegistrationPage implements OnInit {

  public loading = false;
  
  private mError="Campo obbligatorio";

  validation_messages = {
    'UserName': [
        { type: 'required', message: this.mError },
        //{ type: 'minlength', message: "L'utente deve essere più lungo di 3 caratteri" },
        { type: 'maxlength', message: "Massimo 20 caratteri" },
      ],
      'FullName': [
        { type: 'required', message: this.mError  },
        { type: 'minlength', message: "Minimo 3 caratteri" },
      ],
      'Email': [
        { type: 'required', message: this.mError  },
        { type: 'pattern', message: "Formato non corretto" }
      ],
      'Password': [
        { type: 'required', message: this.mError  },
        { type: 'minlength', message: "Minimo 4 caratteri" },
        { type: 'maxlength', message: "Massimo 20 caratteri" },
      ],
      'ConfirmPassword': [
        { type: 'required', message: this.mError  }
      ],
    }

  //constructor(private formBuilder: FormBuilder, public uService: UserService) {
  constructor( public uService: UserService, private router: Router, public toastController: ToastController) {
    
  }

  ngOnInit() {
    this.uService.formModel.reset();
  }


  onSubmit() {

    this.uService.Register().subscribe(
      (res: any) => {
        console.log(res);
        if (res.succeeded) {
          this.uService.formModel.reset();
          this.ShowMessage('Utente registrato correttamente', 'Operazione effettuata', 'primary');
          this.router.navigateByUrl('/login');
        }
        else {
          //AS: ATTENZIONE maiuscole/minuscole (deve corrispondere al JSON)!!!  
          res.errors.forEach(element => {
            switch (element.code) {
              case 'DuplicateUserName':
                this.ShowMessage('Utente già registrato', 'Operazione fallita', 'danger');
                break;
              default:
                //registration is failed
                this.ShowMessage(element.code, 'Operazione fallita', 'danger');
                break;
            }
          });
        }
      },
      err => {
        console.log(err);
      }
    )
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
}
