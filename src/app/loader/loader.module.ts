import { NgModule } from '@angular/core';
import { LoaderComponent } from './loader.component';
import { PageLoaderComponent } from './page-loader.component';

@NgModule({
  declarations: [
    LoaderComponent,
    PageLoaderComponent,
  ],
  exports: [
    LoaderComponent,
    PageLoaderComponent,
  ],
})
export class LoaderModule {
}
