import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

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

  frmRegister : FormGroup;

  formModel = {
    UserName1: '',
    Email1:'',
    Password1: '',
    ConfirmPassword1: ''
  };

  public loading = false;
  
  constructor(private formBuilder: FormBuilder,  public uService: UserService) {
    this.frmRegister = this.formBuilder.group({
      UserName1: ['', Validators.required],
      Email1: [''],
    });
  }

  ngOnInit() {
    this.formModel.UserName1="Pippo";
    
   // this.uService.formModel.reset();
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
