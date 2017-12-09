import { Component, Input } from '@angular/core';

@Component({
  selector: 'AspectRatioContainer',
  templateUrl: './aspect-ratio-container.component.html',
  styleUrls: ['./aspect-ratio-container.component.css']
})
export class AspectRatioContainerComponent {
  @Input() x: number;
  @Input() y: number;
}
