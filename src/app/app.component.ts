import { Component, ViewChild, ElementRef } from "@angular/core";
import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { Router } from "@angular/router";

import { AuthenticationService } from "./_services/authentication.service";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html"
})
export class AppComponent {

  @ViewChild('splashlogo', { static: false }) splashlogo: ElementRef;

  public routerHidden = true;  //per attivare lo splash screen mettere TRUE qui
  selectedPath = "";
  public appPages = [
    {
      title: "Home",
      url: "/home",
      icon: "home"
    },
    {
      title: "Tickets",
      url: "/tabs",
      icon: "albums"
    },
    {
      title: "Trasferte",
      url: "/missions-list",
      icon: "briefcase"
    },
    {
      title: "To Do",
      url: "/todo",
      icon: "menu"
    },
    {
      title: "Clienti",
      url: "/customers-list/0",
      icon: "people"
    },
    {
      title: "Firma",
      url: "/signature/0",
      icon: "at"
    }
    /*
    ,{
      title: "Foto",
      url: "/photo-gallery/1",
      icon: "camera"
    }
    */
  ];

  // INIZIALMENTE C'ERA UN GRUPPO "members" di pagine accessibili se autenticati
  // ora sono individualmente "schermate" con authguard (vedi app.routing.module.ts)
  // {
  //   title: "Home",
  //   url: "/members/tabs/tabHome",
  //   icon: "home"
  // },

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public auth: AuthenticationService,
    private router: Router
  ) {
    this.initializeApp();
  }

  logout() {
    this.auth.setLoggedIn(false);
    this.router.navigateByUrl("/");
  }
  
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      setTimeout(() => {
        this.routerHidden = false;
        //this.splashlogo.nativeElement.style.display = 'none';
      }, 3000);
    });
  }
}
