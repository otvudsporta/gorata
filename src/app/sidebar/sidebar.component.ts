import { Component } from '@angular/core';

@Component({
  selector: 'Sidebar',
  template: `
    <Header class="header sticky top-0"></Header>
    <router-outlet></router-outlet>
  `,
  styles: [`
    :host {
      overflow-x: hidden;
      overflow-y: auto;
      position: fixed;

      top: 10px;
      bottom: 10px;
      left: 10px;

      border-radius: 3px;
      width: var(--sidebar-width-max);
      min-width: var(--sidebar-width-min);
      background: var(--neutral-lighter);
    }

    .header {
      box-shadow: var(--box-shadow);
    }
  `]
})
export class SidebarComponent {
}
