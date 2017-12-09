import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AddressInputModule } from '../address-input/address-input.module';

import { PlaygroundCreateComponent } from './playground-create.component';

@NgModule({
  imports: [
    FormsModule,
    AddressInputModule,
  ],
  declarations: [
    PlaygroundCreateComponent,
  ],
  exports: [
    PlaygroundCreateComponent,
  ],
})
export class PlaygroundCreateModule {
}
