import { NgModule } from '@angular/core';
import { InterpolatePipe } from './interpolate.pipe';

@NgModule({
  declarations: [
    InterpolatePipe,
  ],
  exports: [
    InterpolatePipe,
  ],
})
export class InterpolateModule {
}
