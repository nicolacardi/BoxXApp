import { Component, OnInit, ViewChild } from '@angular/core';

import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { SignaturePadModule } from 'angular2-signaturepad';

import { Platform } from '@ionic/angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';


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
  //public screenOrientation: any;

  mPlatform: Platform;

  @ViewChild(SignaturePad,{static: false}) signaturePad: SignaturePad;
  public signaturePadOptions: Object;
  
  
  constructor(platform: Platform, private screenOrientation: ScreenOrientation ) { 

//console.log("ORIENTATION: " ,window.orientation);
//console.log(this.screenOrientation.type); // logs the current orientation, example: 'landscape'

    // set to landscape
    //this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);

    // allow user rotate
    //this.screenOrientation.unlock();

    //this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
return;

    // detect orientation changes

    platform.ready().then(() => {
      this.screenOrientation.onChange().subscribe(() => {
          console.log("Orientation Changed:",this.screenOrientation.type);

          if(screen.orientation.type == "landscape-primary"){
           //OK, orizzontale
           console.log("Bene così",screen.orientation.type, "Height:" , platform.height() );
           
           this.signaturePadOptions = { 
            'minWidth': 2,
            'canvasWidth': 400, //platform.height() -  platform.height() * 0.2 ,
            'canvasHeight': 200, //platform.width() -  platform.width() * 0.1 ,
            
            'backgroundColor': '#ededed',
            'penColor': 'red'
          };
           //this.signaturePad.options = this.signaturePadOptions;

          }
          else{
            this.signaturePadOptions = { 
              'minWidth': 2,
              'canvasWidth': 400, //platform.height() -  platform.height() * 0.2 ,
              'canvasHeight': 200, //platform.width() -  platform.width() * 0.1 ,
              
              'backgroundColor': '#ededed',
              'penColor': 'red'
            };

            console.log("Gira! sacramento",screen.orientation.type, "Height:" ,platform.height() );
          }
      });
      this.screenOrientation.lock(
        this.screenOrientation.ORIENTATIONS.LANDSCAPE
      );
    }).catch(err=>{
      console.log('Error while loading platform', err);
    });
    
          /*
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
        'backgroundColor': '#ff7843',
        'penColor': 'yellow'
      };
      */
      return;
  }

  ngOnInit() {
  
  }

  /*
  changeOrientation() {
    switch (window.orientation) {
        case 0:
            this.screenOrientation = 'portrait';
            break;
        case 90:
            this.screenOrientation = 'landscape';
            break;
        case 180:
            this.screenOrientation = 'portrait';
            break;
        case -90:
            this.screenOrientation = 'landscape';
            break;
        default:
            this.screenOrientation = 'unknown';
    }
}
*/

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
