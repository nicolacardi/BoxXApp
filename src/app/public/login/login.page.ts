import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthenticationService } from "../../services/authentication.service";
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ['../public.page.scss']
  //styleUrls: ["./login.page.scss"]
})

export class LoginPage implements OnInit {



  public loading = false;
  formModel = {
    UserName: '',
    Password: ''
  };

  constructor(private http: HttpClient, private uService: UserService, private router: Router, private auth: AuthenticationService, public toastController: ToastController) { 
  }

  ionViewDidEnter() {
    this.loading = false;
  }

  ngOnInit() {
    if (localStorage.getItem('token') != null) {
      //this.router.navigateByUrl('members'); //NC c'era scritto default... 
      this.router.navigateByUrl('home'); //NC c'era scritto default... 
    }
  }


  onSubmit(form: NgForm) {

    //this.auth.setLoggedIn(true)
    //this.router.navigateByUrl("members");
    this.loading = true;
    //this.uService.Login(form.value);
    //this.auth.setLoggedIn(true);
    //this.router.navigateByUrl("members");

    //TENTATIVO CON HEADERS
    //  const options = {
    //   headers: new HttpHeaders().append('Content-Type', 'application/json'),
    // }
    // this.http.post<currentUser>('http://188.152.211.199/iQWApi/api/ApplicationUser/Login', form.value, {
    //   headers : new HttpHeaders({
    //     'Content-Type': 'application/json' 
    //   })
    // }).subscribe(
    //   utente => {
    //     this.ShowMessage(JSON.stringify(utente.token));
    //     if (utente && utente.token) {
    //       localStorage.setItem('token', utente.token);
    //       localStorage.setItem('currentUser', JSON.stringify(utente));
    //       //        this.currUser = user;
    //       //        this.BehaviourSubjectcurrentUser.next(user);
    //       this.ShowMessage("Login Corretta");
    //       this.auth.setLoggedIn(true);
    //       this.router.navigateByUrl("members");
    //     }
    //   },
    //   err => {
    //     this.ShowMessage(JSON.stringify(err));
    //     this.auth.setLoggedIn(false);
    //   })

    /* Sintassi per  Ionic Native HTTP 
    var httpHeaders = new Headers();
    httpHeaders.append("Accept", 'application/json');
    httpHeaders.append('Content-Type', 'application/json' );
    //headers.append('Access-Control-Allow-Origin', '*' );
  
    let headers = { };
    this.http.setDataSerializer("json");
    this.http.setHeader("Accept", "application/json");
    this.http.setHeader("Content-Type", "application/json");

    this.http.post(this.BaseURI + '/ApplicationUser/Login', formData, httpHeaders)
      .then((response:HTTPResponse) => {
        console.log(`POST ${url} ${JSON.stringify(response.data)}`);
      })
      .catch((error:any) => {
        console.error(`POST ${url} ${error.error}`);
      });
    */

    this.uService.Login(form.value).subscribe(
      (res: any) => {
        //this.uService.changeLoggedIn(true);
        this.auth.setLoggedIn(true);
        //this.ShowMessage("Login Corretta", "Benvenuto " + this.uService.currUser.fullname, false);
        this.ShowMessage("Benvenuto " + this.uService.currUser.fullname);
        //Forse fa schifo ma funziona
        //this.sidebar.ngOnInit();
        //this.router.navigateByUrl("members");
        this.router.navigateByUrl("home");
      },
      err => {

        this.loading = false;
        this.auth.setLoggedIn(false);
        //this.uService.changeLoggedIn(false);
        if (err.status == 400) {
          //this.ShowMessage("Utente o Password errati", "Riprova",true);
          this.ShowMessage("Utente o Password errati");
        }
        else {
          console.log(err);
        }
      }

    );
  }

  async ShowMessage(msg: string, title?: string) {
    const toast = await this.toastController.create({
      message: msg,
      color: 'primary',
      duration: 2000,
      showCloseButton: true,  
      closeButtonText: 'OK',  
    });
    toast.present();
  }

}
