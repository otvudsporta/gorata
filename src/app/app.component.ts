import { Component } from '@angular/core';

@Component({
  selector: 'App',
  template: `
    <Map class="map"></Map>
    <Sidebar class="sidebar"></Sidebar>

    <simple-notifications class="notifications" [options]="{ timeOut: 10000 }"></simple-notifications>
  `,
  styles: [`
    .map {
      position: fixed;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      height: calc(100% - 75px);
    }

    .sidebar {
      background: var(--neutral-lighter);
      box-shadow: 0 1px 2px 0 rgba(0,0,0,0.18), 0 6px 12px 0 rgba(0,0,0,0.18);
      overflow-x: hidden;
      overflow-y: auto;
      position: fixed;
      top: 35%;
      left: 0;
      width: 100%;
      height: 65%;
    }

    @media screen and (min-width: 480px) {
      min-width: 375px;
    }

    @media screen and (min-width: 768px) {
      .map {
        top: 0;
        height: 100%;
      }

      .sidebar {
        top: 10px;
        left: 10px;
        height: calc(100% - 20px);
        width: 35%;
        border-radius: 4px;
      }
    }

    .notifications {
      position: fixed;
      bottom: 0;
      right: 0;
    }
  `]
})
export class AppComponent {
}
