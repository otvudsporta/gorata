import { ErrorHandler as NgErrorHandler, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { environment } from '../environments/environment';

import { AspectRatioContainerModule } from './aspect-ratio-container/aspect-ratio-container.module';
// import { ImageModule } from './image/image.module';
import { LoaderModule } from './loader/loader.module';
import { MapModule } from './map/map.module';
import { RouterModule } from './router.module';
import { PlaygroundCreateModule } from './playground-create/playground-create.module';
// import { SettingsModule } from './settings/settings.module';

import { NavigatorService } from './navigator.service';
import { StoreService } from './store.service';

import { AppComponent } from './app.component';
import { AuthService } from './auth.service';
import { ErrorHandler } from './error-handler';
import { FileUploadService } from './file-upload.service';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { PlaygroundDetailsComponent } from './playground-details/playground-details.component';
import { PlaygroundEditComponent } from './playground-edit/playground-edit.component';
import { PlaygroundListComponent } from './playground-list/playground-list.component';
import { PlaygroundService } from './playground.service';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  imports: [
    AngularFireModule.initializeApp({
      apiKey: environment.GOOGLE_API_KEY,
      authDomain: environment.FIREBASE_AUTH_DOMAIN,
      databaseURL: environment.FIREBASE_DATABASE_URL,
      projectId: environment.FIREBASE_PROJECT_ID,
      storageBucket: environment.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: environment.FIREBASE_MESSAGING_SENDER_ID
    }),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    SimpleNotificationsModule.forRoot(),

    AspectRatioContainerModule,
    // ImageModule,
    LoaderModule,
    MapModule,
    PlaygroundCreateModule,
    RouterModule,
    // SettingsModule,
  ],
  providers: [
    { provide: NgErrorHandler, useClass: ErrorHandler },
    AuthService,
    FileUploadService,
    PlaygroundService,

    NavigatorService,
    StoreService,
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    PlaygroundDetailsComponent,
    PlaygroundEditComponent,
    PlaygroundListComponent,
    SidebarComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
