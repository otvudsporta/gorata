import { Component } from '@angular/core';

@Component({
  selector: 'Sidebar',
  template: `
    <Header class="header"></Header>
    <div class="content">
      <router-outlet></router-outlet>
    </div>
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
      position: sticky;
      top: 0;
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.18);
    }

    .content {
      padding: 1.75rem;
    }
  `]
})
export class SidebarComponent {
}
