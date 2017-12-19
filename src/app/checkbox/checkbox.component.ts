import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'Checkbox',
  template: `
    <label class="lb-checkbox" [class.--checked]="model === true">
      <input class="lb-checkbox-input" type="checkbox" [name]="name" [(ngModel)]="model" />
      <div class="lb-checkbox-icon"></div>
      <ng-content class="lb-checkbox-content"></ng-content>
    </label>
  `,
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent {
  @Input() name: string;

  @Input() model: boolean;
  @Output() modelChange = new EventEmitter<boolean>();
}
