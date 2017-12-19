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
      display: block;
      position: relative;
    }

    .header {
      z-index: 10;
      box-shadow: var(--box-shadow);
    }

    .content {
      overflow-x: hidden;
      overflow-y: auto;
      height: 100%;
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
