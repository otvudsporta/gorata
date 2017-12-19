import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AspectRatioContainerModule } from '../aspect-ratio-container/aspect-ratio-container.module';
import { CheckboxModule } from '../checkbox/checkbox.module';
import { LoaderModule } from '../loader/loader.module';

import { CapitalizePipe } from '../capitalize.pipe';

import { PlaygroundCreateComponent } from './playground-create.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    AspectRatioContainerModule,
    CheckboxModule,
    LoaderModule,
  ],
  declarations: [
    CapitalizePipe,
    PlaygroundCreateComponent,
  ],
  exports: [
    PlaygroundCreateComponent,
  ],
})
export class PlaygroundCreateModule {
}
