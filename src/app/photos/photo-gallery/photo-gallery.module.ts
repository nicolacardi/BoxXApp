import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PhotoGalleryPageRoutingModule } from './photo-gallery-routing.module';

import { PhotoGalleryPage } from './photo-gallery.page';

//import { CameraOptions } from '@ionic-native/camera/ngx';
import { NgxIonicImageViewerModule } from 'ngx-ionic-image-viewer';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PhotoGalleryPageRoutingModule,
    NgxIonicImageViewerModule
  ],
  declarations: [PhotoGalleryPage]
})
export class PhotoGalleryPageModule {}
