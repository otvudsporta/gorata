import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MapComponent } from './map/map.component';
import { LoaderComponent } from './loader/loader.component';
import { RouterModule } from './router.module';
import { LoginComponent } from './login/login.component';
import { PlaygroundListComponent } from './playground-list/playground-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    MapComponent,
    LoaderComponent,
    LoginComponent,
    PlaygroundListComponent
  ],
  imports: [
    BrowserModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
