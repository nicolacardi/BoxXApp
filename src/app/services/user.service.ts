import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { currentUser } from '../models/models';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private BehaviourSubjectLoggedIn = new BehaviorSubject<boolean>(false);
  obsLoggedIn = this.BehaviourSubjectLoggedIn.asObservable();

  private BehaviourSubjectcurrentUser: BehaviorSubject<currentUser>;
  public obscurrentUser: Observable<currentUser>;

  public currUser: currentUser;
  readonly BaseURI = environment.apiBaseUrl;

  constructor(private fb: FormBuilder, private http: HttpClient, public toastController: ToastController) {
    this.BehaviourSubjectcurrentUser = new BehaviorSubject<currentUser>(JSON.parse(localStorage.getItem('currentUser')));
    this.obscurrentUser = this.BehaviourSubjectcurrentUser.asObservable();
  }

  formModel = this.fb.group({
    UserName: ['', Validators.required],
    Email: ['', Validators.email],
    FullName: [''],
    Password: [''],
    ConfirmPassword: ['']
    /*
    Passwords: this.fb.group({
      Password: ['', [Validators.required, Validators.minLength(4)]],
      ConfirmPassword: ['', Validators.required]
    },
      {
        validator: this.comparePasswords
      }
    )
    */
  });

  Login(formData) {
    return this.http.post<currentUser>(this.BaseURI + '/ApplicationUser/Login', formData)
      .pipe(map(user => {
        if (user && user.token) {
          localStorage.setItem('token', user.token);
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currUser = user;
          this.BehaviourSubjectcurrentUser.next(user);
        }
        return user;
      }));
  }

  Logout() {
    //console.log("DEBUG: User.service/Logout");
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
  }

  Register() {
    var body = {
      UserName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      FullName: this.formModel.value.FullName,
      //Password: this.formModel.value.Passwords.Password
      Password: this.formModel.value.Password
    };
    console.log("User.service:");
    console.log(body);
    return this.http.post(this.BaseURI + '/ApplicationUser/Register', body);
  }

  public get currentUserValue(): currentUser {
    return this.BehaviourSubjectcurrentUser.value;
  }

  changeLoggedIn(val: boolean) {
    this.BehaviourSubjectLoggedIn.next(val)
    //console.log ("user.service.ts - isLoggedIn viene impostato a "+ val)
  }

  //AS: custom validator
  comparePasswords(fb: FormGroup) {
    let confirmPasswordCtrl = fb.get('ConfirmPassword');
    //passwordMismatch
    //comfirmPasswordCtrl.errors{passwordMismatch:true};
    if (confirmPasswordCtrl.errors == null || 'passwordMismatch' in confirmPasswordCtrl.errors) {
      if (fb.get('Password').value != confirmPasswordCtrl.value)
        confirmPasswordCtrl.setErrors({ passwordMismatch: true });
      else
        confirmPasswordCtrl.setErrors(null);
    }
  }


}
