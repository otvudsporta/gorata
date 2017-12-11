import { Component, Input } from '@angular/core';

@Component({
  selector: 'AspectRatioContainer',
  template: `
    <div [style.padding-bottom.%]="100 * y / x"></div>
    <ng-content></ng-content>
  `,
  styles: [`
    :host {
      position: relative;
    }
  `]
})
export class AspectRatioContainerComponent {
  @Input() x: number;
  @Input() y: number;
}
