import { NgModule, ErrorHandler as NgErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MapComponent } from './map/map.component';
import { LoaderComponent } from './loader/loader.component';
import { LoginComponent } from './login/login.component';
import { PlaygroundListComponent } from './playground-list/playground-list.component';
import { PlaygroundCreateComponent } from './playground-create/playground-create.component';
import { AspectRatioContainerComponent } from './aspect-ratio-container/aspect-ratio-container.component';

import { RouterModule } from './router.module';

import { ErrorHandler } from './error-handler';
import { StoreService } from './store.service';
import { AuthService } from './auth.service';
import { PlaygroundService } from './playground.service';
import { FileUploadService } from './file-upload.service';
// import { ImageDirective } from './image.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    MapComponent,
    LoaderComponent,
    LoginComponent,
    PlaygroundListComponent,
    PlaygroundCreateComponent,
    AspectRatioContainerComponent,
    // ImageDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    AngularFireModule.initializeApp({
      apiKey: environment.GOOGLE_API_KEY,
      authDomain: environment.FIREBASE_AUTH_DOMAIN,
      databaseURL: environment.FIREBASE_DATABASE_URL,
      projectId: environment.FIREBASE_PROJECT_ID,
      storageBucket: environment.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: environment.FIREBASE_MESSAGING_SENDER_ID
    }),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  providers: [
    { provide: NgErrorHandler, useClass: ErrorHandler },
    StoreService,
    AuthService,
    PlaygroundService,
    FileUploadService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
