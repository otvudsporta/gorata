import { NgModule } from '@angular/core';

import { LoaderModule } from '../loader/loader.module';
import { NotificationsService } from '../notifications.service';
import { MapComponent } from './map.component';

@NgModule({
  imports: [
    LoaderModule,
  ],
  providers: [
    NotificationsService,
  ],
  declarations: [
    MapComponent,
  ],
  exports: [
    MapComponent,
  ],
})
export class MapModule {
}
