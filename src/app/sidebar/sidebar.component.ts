import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { pageTransition } from '../animations';

@Component({
  selector: 'Sidebar',
  animations: [pageTransition],
  template: `
    <Header class="header sticky top-0"></Header>
    <div class="content" [@pageTransition]="getRouteLevel(routerOutlet)">
      <router-outlet #routerOutlet="outlet"></router-outlet>
    </div>
  `,
  styles: [`
    :host {
      position: relative;
      display: flex;
      flex-direction: column;
    }

    .header {
      z-index: 10;
      box-shadow: var(--box-shadow);
    }

    .content {
      overflow-x: hidden;
      overflow-y: auto;
    }
  `]
})
export class SidebarComponent {
  constructor(private router: Router) {
  }

  getRouteLevel(routerOutlet: RouterOutlet) {
    return routerOutlet.activatedRouteData.level;
  }
}
