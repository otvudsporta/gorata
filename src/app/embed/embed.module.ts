import { NgModule } from '@angular/core';
import { EmbedPipe } from './embed.pipe';

@NgModule({
  declarations: [
    EmbedPipe,
  ],
  exports: [
    EmbedPipe,
  ],
})
export class EmbedModule {
}
