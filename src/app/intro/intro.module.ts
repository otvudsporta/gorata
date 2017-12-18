import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IntroComponent } from './intro.component';

@NgModule({
  imports: [
    RouterModule
  ],
  declarations: [
    IntroComponent,
  ],
  exports: [
    IntroComponent,
  ],
})
export class IntroModule {
}
