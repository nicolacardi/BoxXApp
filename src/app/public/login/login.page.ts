import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "../../services/authentication.service";
import { UserService } from 'src/app/services/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  loading = false;
  formModel={
    UserName:'',
    Password:''
  };
  constructor(private uService: UserService, private router: Router, private auth: AuthenticationService) {}

  ngOnInit() {
    if(localStorage.getItem('token') != null){
      this.router.navigateByUrl('members'); //NC c'era scritto default... 
    }
  }

  onSubmit(form:NgForm) {

    //this.auth.setLoggedIn(true)
    //this.router.navigateByUrl("members");
    this.loading = true;
    //console.log("Login: " + this.formModel.UserName);


    this.uService.Login(form.value).subscribe(
      (res: any) => {

        this.uService.changeLoggedIn(true);
        //this.ShowMessage("Login Corretta", "Benvenuto " + this.uService.currUser.fullname, false);

        //Forse fa schifo ma funziona
        //this.sidebar.ngOnInit();
        console.log('OK! ma c è l auth che blocca...ancora da sistemare ...ma perchè dice Bad request?');
        this.router.navigateByUrl("members");
      },
      err=> {
        this.loading = false;

        this.uService.changeLoggedIn(false);
        if(err.status== 400) {
          //this.ShowMessage("Utente o Password errati", "Riprova",true);
        }
        else {
          console.log(err);
          //this.ShowMessage("Server Error: ", "Time-out" ,true);
          //this.ShowMessage(err,"" , true);
        }
      }
    );
  }
}
