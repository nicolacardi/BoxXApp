import { Component, ViewChild, ElementRef } from "@angular/core";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { AuthenticationService } from "./services/authentication.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html"
})
export class AppComponent {

  @ViewChild('splashlogo', { static: false }) splashlogo: ElementRef;

  public routerHidden = false;
  selectedPath = "";
  public appPages = [
    {
      title: "Home",
      url: "/home",
      icon: "home"
    },
    {
      title: "To Do",
      url: "/todo",
      icon: "menu"
    }
  ];


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
        this.splashlogo.nativeElement.style.display = 'none';
      }, 100);
    });
  }
}
