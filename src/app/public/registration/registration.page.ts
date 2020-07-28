import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthenticationService } from "../../services/authentication.service";
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})

export class RegistrationPage implements OnInit {

  formModel = {
    UserName: '',
    Email:'',
    Password: '',
    ConfirmPassword: ''
  };
  public loading = false;
  
  constructor(public uService: UserService) {
 
  }

  ngOnInit() {
    this.uService.formModel.reset();
  }

  onSubmit(){

    this.uService.Register().subscribe(
      (res: any) => {
        if(res.Succeeded){
          this.uService.formModel.reset();
          //this.toastr.success('Utente creato correttamente', 'Operazione effettuata');
        }
        else{
          //AS: ATTENZIONE maiuscole!!!  
          res.Errors.forEach(element => {
            switch(element.Code)
            {
              case 'DuplicateUserName':
                //username already taken
                //this.toastr.error('Utente già registrato', 'Operazione fallita');
                break;
              default:
                //registration is failed
                //this.toastr.error(element.Code, 'Operazione fallita');
                break;
            }
          });
        }
      },
      err=>{
        console.log(err);
      }
    )
    
  }
}
