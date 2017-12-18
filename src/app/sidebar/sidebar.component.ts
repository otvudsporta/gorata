import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'Sidebar',
  template: `
    <Header class="header sticky top-0" [(showSidebar)]="showSidebar"></Header>
    <div class="content" [class.--hidden]="!showSidebar">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    :host {
      overflow-x: hidden;
      overflow-y: hidden;
      position: fixed;

      top: 0;
      left: 0;

      border-radius: 3px;
      width: 100%;
      min-width: 375px;
      background: var(--neutral-lighter);
    }

    .header {
      z-index: 10;
      height: var(--header-height);
      box-shadow: var(--box-shadow);
    }

    .content {
      overflow-x: hidden;
      overflow-y: auto;
      transition: height var(--transition-duration) var(--transition-easing);
      height: calc(100vh - var(--header-height));
    }

    .content.--hidden {
      overflow: hidden;
      height: 0;
    }

    @media (min-width: 768px) {
      :host {
        width: 35%;
      }
    }

    @media (min-width: 960px) {
      :host {
        top: 10px;
        left: 10px;
        max-height: calc(100% - 20px);
      }

      .content {
        height: calc(100vh - var(--header-height) - 20px);
      }
    }
  `]
})
export class SidebarComponent implements OnInit, OnDestroy {
  constructor(private router: Router) {
  }

  showSidebar = true;
  private susbcriptions: Subscription[] = [];

  ngOnInit() {
    this.susbcriptions.push(
      this.router.events.subscribe(() => this.showSidebar = true)
    );
  }

  ngOnDestroy() {
    this.susbcriptions.forEach((subscription) => subscription.unsubscribe());
    this.susbcriptions = [];
  }
}
