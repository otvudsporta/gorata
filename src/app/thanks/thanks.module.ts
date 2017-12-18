import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ThanksComponent } from './thanks.component';

@NgModule({
  imports: [
    RouterModule
  ],
  declarations: [
    ThanksComponent,
  ],
  exports: [
    ThanksComponent,
  ],
})
export class ThanksModule {
}
