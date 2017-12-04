// TODO: Fix and include in module
import { Directive, OnInit, OnChanges, Attribute, ElementRef } from '@angular/core';

@Directive({
  selector: 'img'
})
export class ImageDirective implements OnInit, OnChanges {
  constructor(
    @Attribute('src') private originalSrc: string,
    private $el: ElementRef
  ) {
  }

  loaded: boolean;

  ngOnInit() {
    if (this.originalSrc) {
      this.ngOnChanges();
    }
  }

  ngOnChanges() {
    if (this.loaded) return;

    const mockImageElement = new (<any>window).Image();
    const errorSrc = 'assets/error.png';
    const loadingSrc = 'assets/default.png';

    mockImageElement.onload = () => {
      this.loaded = true;
      this.$el.nativeElement.src = this.originalSrc;
    };

    mockImageElement.onerror = () => {
      this.loaded = true;
      this.$el.nativeElement.src = errorSrc;
    };

    mockImageElement.src = this.originalSrc; // Start loading the image
    this.$el.nativeElement.src = loadingSrc;
  }
}
