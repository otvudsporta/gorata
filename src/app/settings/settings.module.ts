import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { SettingsComponent } from './settings.component';

@NgModule({
  declarations: [
    SettingsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
})
export class SettingsModule {
}
