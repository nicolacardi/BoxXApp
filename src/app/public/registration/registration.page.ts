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


  validation_messages = {
    'UserName1': [
        { type: 'required', message: "Campo utente obbligatorio" },
        //{ type: 'minlength', message: "L'utente deve essere più lungo di 3 caratteri" },
        { type: 'maxlength', message: "L'utente deve essere più corto di 20 caratteri" },
      ],
      'Email1': [
        { type: 'required', message: "Campo email obbligatorio" },
        { type: 'pattern', message: "L'Email non sembra nel formato corretto" }
      ],
      'Password1': [
        { type: 'required', message: "Campo Password obbligatorio" },
        { type: 'minlength', message: "La Password deve essere più lunga di 3 caratteri" },
        { type: 'maxlength', message: "La Password deve essere più corta di 20 caratteri" },
      ],
      'ConfirmPassword1': [
        { type: 'required', message: "Campo Ripetizione Password obbligatorio" },
      ],
      'validator': [
        { type: 'required', message: "Campo Ripetizione Password obbligatorio" },
      ]
    }


  public loading = false;

  constructor(private formBuilder: FormBuilder, public uService: UserService) {
    this.frmRegister = this.formBuilder.group(
      {
        UserName1: ['', [Validators.required, Validators.maxLength(19)]],
        Email1: ['', [Validators.required, Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')]],
        Password1: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(19)]],
        ConfirmPassword1: ['', [Validators.required]],
      },
      {validator: this.checkIfMatchingPasswords('Password1', 'ConfirmPassword1')}
      
      )
  }


  checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
        let passwordInput = group.controls[passwordKey],
            passwordConfirmationInput = group.controls[passwordConfirmationKey];
        if (passwordInput.value !== passwordConfirmationInput.value) {
            return passwordConfirmationInput.setErrors({notEquivalent: true})
        }
        else {
            return passwordConfirmationInput.setErrors(null);
        }
    }
  }


  ngOnInit() {


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
