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
      width: 100%;
      height: 40%;
    }

    .sidebar {
      background: var(--neutral-lighter);
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.18), 0 6px 12px 0 rgba(0, 0, 0, 0.18);
    }

    @media screen and (min-width: 768px) {
      .map {
        height: 100%;
      }

      .sidebar {
        --margin: 10px;

        overflow: hidden;
        position: fixed;
        top: var(--margin);
        bottom: var(--margin);
        left: var(--margin);
        width: 35%;
        min-width: 375px;
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
