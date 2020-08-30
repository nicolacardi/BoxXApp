import { Component, OnInit, ViewChild } from '@angular/core';

import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { SignaturePadModule } from 'angular2-signaturepad';

import { Platform } from '@ionic/angular';
//import {ScreenOrientation} from '@ionic-native/screen-orientation/ngx';


@Component({
  selector: 'app-signature',
  templateUrl: './signature.page.html',
  styleUrls: ['./signature.page.scss'],
})

export class SignaturePage implements OnInit {

  signature = '';
  isDrawing = false;
  isHorizontal : boolean = false;
  orientation: string;

  mPlatform: Platform;

  @ViewChild(SignaturePad,{static: false}) signaturePad: SignaturePad;
  public signaturePadOptions: Object;
  
  
  constructor(platform: Platform
    //, private screenOrientation: ScreenOrientation 
    ) { 

               console.log("ORIENTATION: " ,window.orientation);

      let w = 0;
      let h =0;
      if(window.orientation == 0){
        w =  platform.width() -  platform.width() * 0.1 ;
        h= platform.height() -  platform.height() * 0.2 ;
      }
      else{
        h =  platform.width() -  platform.width() * 0.1 ;
        w= platform.height() -  platform.height() * 0.2 ;
      }
      console.log("h: " ,h);
      console.log("w: " ,w);

      this.signaturePadOptions = { 
        'minWidth': 2,
        'canvasWidth': w ,
        'canvasHeight': h ,
        'backgroundColor': '#ededed',
        'penColor': 'black'
      };
/*
      platform.ready().then(() => {
        this.orientation = this.screenOrientation.type;
     }).catch(err=>{
       console.log('Error while loading platform', err);
     });
*/
      return;

      /*
      platform.ready().then(() => {

        this.orientation = this.screenOrientation.type;

        this.screenOrientation.onChange().subscribe(
            () => {
                this.orientation = this.screenOrientation.type;
            }
        );

        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
        
    }).catch(err => {
        console.log('Error while loading platform', err);
    });
    */
    return;

    
    this.isHorizontal = false;
    this.mPlatform= platform;

    this.signaturePadOptions= new Object;
  
    this.signaturePadOptions = { 
      'minWidth': 2,
      'canvasWidth': platform.width() -  platform.width() * 0.1 ,
      'canvasHeight': platform.height() -  platform.height() * 0.2 ,
      'backgroundColor': '#ededed',
      'penColor': 'black'
    };

    console.log(screen.orientation.type);


    screen.orientation.onchange = function( ){
        console.log("Orientation Changed",screen.orientation.type );

        if(screen.orientation.type == "landscape-primary"){
          //OK, orizzontale
          console.log("Bene così",screen.orientation.type, platform.height() );
          /*
          this.signaturePadOptions = { 
            'minWidth': 2,
            'canvasWidth': platform.height() -  platform.height() * 0.2 ,
            'canvasHeight': platform.width() -  platform.width() * 0.1 ,
            
            'backgroundColor': '#ededed',
            'penColor': 'black'
          };
          */
        }
        else{
          
          console.log("Gira! sacramento",screen.orientation.type, platform.height() );
          /*
          this.signaturePadOptions = { 
            'minWidth': 2,
            'canvasHeight': platform.height() -  platform.height() * 0.2 ,
            'canvasWidth': platform.width() -  platform.width() * 0.1 ,
            
            'backgroundColor': 'yellow',
            'penColor': 'black'
          };
          */
        }
    };
  }

  changeOrientationSettings(){
    /*
    if(screen.orientation.type == "landscape-primary"){
      //OK, orizzontale
      console.log("Bene così",screen.orientation.type, this.platform.height() );

      this.signaturePadOptions = { 
        'minWidth': 2,
        'canvasWidth': platform.height() -  platform.height() * 0.2 ,
        'canvasHeight': platform.width() -  platform.width() * 0.1 ,
        
        'backgroundColor': '#ededed',
        'penColor': 'black'
      };

    }
    else{
      
      console.log("Gira! sacramento",screen.orientation.type, platform.height() );
      this.signaturePadOptions = { 
        'minWidth': 2,
        'canvasHeight': platform.height() -  platform.height() * 0.2 ,
        'canvasWidth': platform.width() -  platform.width() * 0.1 ,
        
        'backgroundColor': 'yellow',
        'penColor': 'black'
      };
    }
    */
  }

  detectOrientation(){

  }
  
  ngOnInit() {

  }

  ionViewDidEnter() {
    this.signaturePad.clear();

    //this.storage.get('savedSignature').then((data) => {
    //  this.signature = data;
    //});
  }

  drawComplete() {
    this.isDrawing = false;
  }
 
  drawStart() {
    this.isDrawing = true;
  }
  clearPad() {
    this.signaturePad.clear();
  }

  savePad() {
    this.signature = this.signaturePad.toDataURL();
    console.log("savePad: " , this.signature);

    //this.storage.set('savedSignature', this.signature);
    this.signaturePad.clear();
    //let toast = this.toastCtrl.create({
    //  message: 'New Signature saved.',
    //  duration: 3000
    //});
    //toast.present();
  }

}
