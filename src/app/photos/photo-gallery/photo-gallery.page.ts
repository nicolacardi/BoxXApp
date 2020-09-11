import { Component, OnInit } from '@angular/core';
import { ticketPhoto } from 'src/app/_models/models';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

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

  
  //public immagine: any;
  
  takePicture() {
    const options: CameraOptions = {
      quality: 70,
      //destinationType: this.camera.DestinationType.FILE_URI,    //PER JPG
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
     this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      //this.immagine = 'data:image/jpeg;base64,' + imageData;
      this.photoService.InitFormData();
      
      //this.photoService.formData.id = this.objPhoto.id;
      
      this.photoService.formData.ticketID = 1;
      this.photoService.formData.photo = 'data:image/jpeg;base64,' + imageData;
      this.photoService.formData.dtIns = new Date();


      this.photoService.postPhoto().subscribe(
        res => {
          this.ShowMessage("Firma registrata");
        },
        err => {
          //console.log(err);
          this.ShowMessage("Errore nel salvataggio", 'danger'  );
        }
      )

      console.log ("imageData", imageData);

      this.photos.unshift({ 
        id: null, 
        ticketID: 1, //ricordarsi di inserire this.ticketID
        ticketDetailID: null,
        photo: 'data:image/jpeg;base64,' + imageData,
        dtIns: new Date()
      });
     }, (err) => {
      // Handle error
     });
  }

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
