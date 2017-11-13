import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'Loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
  }
}

@Component({
  selector: 'PageLoader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class PageLoaderComponent extends LoaderComponent {
  @HostBinding('class.page-loader') pageLoader = true;
}

