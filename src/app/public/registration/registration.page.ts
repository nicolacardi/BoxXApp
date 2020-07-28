import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

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

  frmRegister: FormGroup;

  formModel = {
    UserName1: '',
    Email1: '',
    Password1: '',
    ConfirmPassword1: ''
  };

  public loading = false;

  constructor(private formBuilder: FormBuilder, public uService: UserService) {
    this.frmRegister = this.formBuilder.group(
      {
        UserName1: ['', Validators.required],
        Email1: ['', Validators.email],
        Passwords: this.formBuilder.group({
          Password1: ['', [Validators.required, Validators.minLength(4)]],
          ConfirmPassword1: ['', Validators.required]
        },
          // {
          //   validator: this.comparePasswords
          // }
        )
      })
  }

  // comparePasswords(formBuilder: FormGroup) {
  //   let confirmPasswordCtrl = formBuilder.get('ConfirmPassword1');
  //   //passwordMismatch
  //   //comfirmPasswordCtrl.errors{passwordMismatch:true};
  //   if (confirmPasswordCtrl.errors == null || 'passwordMismatch' in confirmPasswordCtrl.errors) {
  //     if (formBuilder.get('Password1').value != confirmPasswordCtrl.value)
  //       confirmPasswordCtrl.setErrors({ passwordMismatch: true });
  //     else
  //       confirmPasswordCtrl.setErrors(null);
  //   }
  // }


  ngOnInit() {
    this.formModel.UserName1 = "Pippo";

    // this.uService.formModel.reset();
  }

  onSubmit() {

    this.uService.Register().subscribe(
      (res: any) => {
        if (res.Succeeded) {
          this.uService.formModel.reset();
          //this.toastr.success('Utente creato correttamente', 'Operazione effettuata');
        }
        else {
          //AS: ATTENZIONE maiuscole!!!  
          res.Errors.forEach(element => {
            switch (element.Code) {
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
      err => {
        console.log(err);
      }
    )

  }
}
