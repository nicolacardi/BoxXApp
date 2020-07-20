import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "../../services/authentication.service";
import { UserService } from 'src/app/services/user.service';
import { NgForm } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { currentUser } from 'src/app/models/models';

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  loading = false;
  formModel = {
    UserName: '',
    Password: ''
  };
  constructor(private http: HttpClient, private uService: UserService, private router: Router, private auth: AuthenticationService, public toastController: ToastController) { }

  ngOnInit() {
    if (localStorage.getItem('token') != null) {
      this.router.navigateByUrl('members'); //NC c'era scritto default... 
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


    this.uService.Login(form.value).subscribe(
      (res: any) => {
        //this.uService.changeLoggedIn(true);
        this.auth.setLoggedIn(true);
        //this.ShowMessage("Login Corretta", "Benvenuto " + this.uService.currUser.fullname, false);
        this.ShowMessage("Benvenuto " + this.uService.currUser.fullname);
        //Forse fa schifo ma funziona
        //this.sidebar.ngOnInit();
        console.log('OK! ma c è l auth che blocca...ancora da sistemare ...ma perchè dice Bad request?');
        this.router.navigateByUrl("members");
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

  /*ShowMessage(msg: string, title?: string, hasErrors: boolean= false ) {
    let config = new MatSnackBarConfig();
    config.verticalPosition  = 'bottom';
    config.horizontalPosition = 'center';
    config.duration = 2000;
    if(hasErrors){
      config.panelClass =  ['error-class'];
      console.log("ShowMessage: hasErrors");
    }
    if(title != null)
      this.snackBar.open(msg, title, config);
    else
      this.snackBar.open(msg,null, config);
  }*/


}
