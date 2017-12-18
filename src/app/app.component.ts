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
      top: 75px;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      height: calc(100% - 75px);
    }

    .sidebar {
      overflow-x: hidden;
      overflow-y: hidden;
      position: fixed;

      top: 0;
      left: 0;

      width: 100%;
      min-width: 375px;
    }

    @media (min-width: 768px) {
      .map {
        top: 0;
        height: 100%;
      }

      .sidebar {
        top: 10px;
        left: 10px;
        width: 35%;
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
