import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, RouteReuseStrategy, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { IonicModule, IonicRouteStrategy  } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { SignaturePadModule } from 'angular2-signaturepad';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

//################## On development ....
import { Camera } from '@ionic-native/camera/ngx';
//################## 


import { UserService } from './_services/user.service';


@NgModule({
  declarations: [AppComponent, ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    
    SignaturePadModule
  ],
  providers: [
    UserService,
    StatusBar,
    SplashScreen,
    ScreenOrientation,
    Camera,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    //TODO !!! {provide: ErrorHandler, useClass: IonicErrorHandler}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
