import { Component, HostBinding } from '@angular/core';
import { LoaderComponent } from './loader.component';

@Component({
  selector: 'PageLoader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class PageLoaderComponent extends LoaderComponent {
  @HostBinding('class.page-loader') true;
}
