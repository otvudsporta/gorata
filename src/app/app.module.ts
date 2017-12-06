import { ErrorHandler as NgErrorHandler, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { AspectRatioContainerComponent } from './aspect-ratio-container/aspect-ratio-container.component';
import { AuthService } from './auth.service';
import { CapitalizePipe } from './capitalize.pipe';
import { ErrorHandler } from './error-handler';
import { FileUploadService } from './file-upload.service';
import { HeaderComponent } from './header/header.component';
// import { ImageDirective } from './image.directive';
import { InterpolatePipe } from './interpolate.pipe';
import { LoaderComponent, PageLoaderComponent } from './loader/loader.component';
import { LoginComponent } from './login/login.component';
import { MapComponent } from './map/map.component';
import { PlaygroundCreateComponent } from './playground-create/playground-create.component';
import { PlaygroundDetailsComponent } from './playground-details/playground-details.component';
import { PlaygroundEditComponent } from './playground-edit/playground-edit.component';
import { PlaygroundListComponent } from './playground-list/playground-list.component';
import { PlaygroundService } from './playground.service';
import { RouterModule } from './router.module';
// import { SettingsComponent } from './settings/settings.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { StoreService } from './store.service';

@NgModule({
  declarations: [
    AppComponent,
    AspectRatioContainerComponent,
    CapitalizePipe,
    HeaderComponent,
    // ImageDirective,
    InterpolatePipe,
    LoaderComponent, PageLoaderComponent,
    LoginComponent,
    MapComponent,
    PlaygroundCreateComponent,
    PlaygroundDetailsComponent,
    PlaygroundEditComponent,
    PlaygroundListComponent,
    // SettingsComponent,
    SidebarComponent,
  ],
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
    RouterModule,
    SimpleNotificationsModule.forRoot(),
  ],
  providers: [
    { provide: NgErrorHandler, useClass: ErrorHandler },
    AuthService,
    FileUploadService,
    PlaygroundService,
    StoreService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
