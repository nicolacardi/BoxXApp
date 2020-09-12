import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhotoGalleryPage } from './photo-gallery.page';
//import { NgxIonicImageViewerModule } from 'ngx-ionic-image-viewer';

const routes: Routes = [
  {
    path: '',
    component: PhotoGalleryPage
  }
];

@NgModule({
  imports: [
    //NgxIonicImageViewerModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class PhotoGalleryPageRoutingModule {}
