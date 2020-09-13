import { Component, OnInit } from '@angular/core';
import { ticketPhoto } from 'src/app/_models/models';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
//import { ImagePicker } from '@ionic-native/image-picker/ngx';

import { IonToggle, ModalController } from '@ionic/angular';
import { ViewerModalComponent } from 'ngx-ionic-image-viewer';


import { TicketService } from 'src/app/_services/ticket.service';
import { TicketPhotosService } from 'src/app/_services/ticket-photos.service';


@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.page.html',
  styleUrls: ['./../photos.scss'],
})
export class PhotoGalleryPage implements OnInit {

  loading = true;
  ticketID: number;

  //public objTicket: ticket;
  public objPhoto : ticketPhoto;
  public photos: ticketPhoto[];

  photoASCII = '';

  constructor( public route: ActivatedRoute
    , public ticketService: TicketService
    , public photoService: TicketPhotosService
    , public toastController: ToastController
    , public camera: Camera
    //, private imagePicker: ImagePicker
    , public modalController: ModalController
    ) { 
    
    this.ticketID = this.route.snapshot.params['ticketId'];

    this.photoService.getPhotosList(this.ticketID)
    .subscribe(
      res=>   { 
        this.photos = res as ticketPhoto[];
        //res.sort((a, b) =>a.n_Ticket < b.n_Ticket ? -1: 1);

        console.log("N° rec: ", this.photos.length.toString());
        //console.log(JSON.stringify( this.photos));

        this.loading = false;
     }
    );
  }

  ngOnInit() {
  }

  //scatta una foto con la fotocamera del device
  takePicture() {
    const options: CameraOptions = {
      quality: 70,
      //destinationType: this.camera.DestinationType.FILE_URI,    //PER JPG
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }
    
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      //this.immagine = 'data:image/jpeg;base64,' + imageData;
      this.photoService.InitFormData();
      
      this.photoService.formData.ticketID = this.ticketID;
      this.photoService.formData.photo = 'data:image/jpeg;base64,' + imageData;
      this.photoService.formData.dtIns = new Date();

      this.photoService.postPhoto().subscribe(
        res => {
          this.ShowMessage("Foto registrata");
        },
        err => {
          //console.log(err);
          this.ShowMessage("Errore nel salvataggio", 'danger'  );
        }
      )

      this.photos.unshift({ 
        id: null, 
        ticketID: this.ticketID,
        ticketDetailID: null,
        photo: 'data:image/jpeg;base64,' + imageData,
        dtIns: new Date()
      });
     }, (err) => {
      // Handle error
     });
  }

  //Seleziona una o più immagini dalla gallery del device
  getPictures(){
    
    // this.imagePicker.getPictures({
    //   maximumImagesCount: 5,
    //   outputType: 1
    // }).then(
    //   (results) => {
    //     for (var i = 0; i < results.length; i++) {

    //       console.log('Image URI: ' + results[i]);

    //       this.photoService.InitFormData();
      
    //       this.photoService.formData.ticketID = this.ticketID;
    //       this.photoService.formData.photo = 'data:image/jpeg;base64,' + results[i];
    //       this.photoService.formData.dtIns = new Date();
    
    //       this.photoService.postPhoto().subscribe(
    //         res => {
    //           //this.ShowMessage("Foto registrata");
    //           console.log("Foto registrata");

    //           this.photos.unshift({ 
    //             id: null, 
    //             ticketID: this.ticketID,
    //             ticketDetailID: null,
    //             photo: 'data:image/jpeg;base64,' + results[i],
    //             dtIns: new Date()
    //           });
    //         },
    //         err => {
    //           //console.log(err);
    //           this.ShowMessage("Errore nel salvataggio", 'danger'  );
    //         });
    //     }
    //   });
  }

  //Apre l'immagine a pieno schermo
  //zoomPicture(id){
    //console.log("Photo id:" , id);

    //recupero il base64 dell'immagine
    //...

    //la passo alla funzione openViewer


  //}

  async zoomPicture(id) {
    const modal = await this.modalController.create({
      component: ViewerModalComponent,
      componentProps: {
        src: "./assets/img/demo.jpg"
      },
      cssClass: 'ion-img-viewer',
      keyboardClose: true,
      showBackdrop: true
    });
 
    return await modal.present();
  }
  //async openViewer(base64: string) {
    /*
    const modal = await this.modalController.create({
      component: ViewerModalComponent,
      componentProps: {
        src: base64, // required
        title: 'Immagine ... ', // optional
        //text: 'Photo by Mayur Gala on Unsplash' // optional
      },
      cssClass: 'ion-img-viewer', // required
      keyboardClose: true,
      showBackdrop: true
    });

    return await modal.present();
    */
  //}

  async ShowMessage(msg: string, titolo?: string, colore?: string) {
    var mColor = colore;
    if(mColor== null)
      mColor='primary';

    const toast = await this.toastController.create({
      message: msg,
      color: mColor,
      duration: 2000,
      showCloseButton: true,  
      closeButtonText: 'OK',  
    });
    toast.present();
  }
  
}
