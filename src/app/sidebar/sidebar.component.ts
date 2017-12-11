import { Component } from '@angular/core';

@Component({
  selector: 'Sidebar',
  template: `<router-outlet></router-outlet>`,
  styles: [`
    :host {
      grid-row: 2;
      grid-column: 1;
      background: var(--neutral-lighter);
    }
  `]
})
export class SidebarComponent {
}
