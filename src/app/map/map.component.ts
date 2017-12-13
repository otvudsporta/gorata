import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import {} from '@types/googlemaps';
import { Subscription } from 'rxjs/Subscription';

import { environment } from '../../environments/environment';
import { StoreService } from '../store.service';
import { loadScript } from '../utils';

import { NavigatorService } from '../navigator.service';

@Component({
  selector: 'Map',
  template: `
    <div>
      <Loader></Loader>
    </div>
  `,
  styles: [`
    :host {
      grid-row: 1 / -1;
      grid-column: 2;

      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 300px;
      color: var(--neutral-lighter);
    }
  `]
})
export class MapComponent implements OnInit, OnDestroy {
  private mapResolved: boolean;
  private subscriptions: Subscription[] = [];
  private markers: google.maps.Marker[] = [];

  constructor(
    private elementRef: ElementRef,
    private navigatorService: NavigatorService,
    private store: StoreService
  ) {
  }

  async ngOnInit() {
    if (this.mapResolved) return;

    await loadScript(`https://maps.googleapis.com/maps/api/js?key=${environment.GOOGLE_API_KEY}&language=bg&region=BG&libraries=places`);

    const bounds = new google.maps.LatLngBounds();
    bounds.extend({ lat: 43.541944, lng: 28.609722 }); // East
    bounds.extend({ lat: 43.80948, lng: 22.357125 });  // West
    bounds.extend({ lat: 44.2125, lng: 22.665833 });   // North
    bounds.extend({ lat: 41.234722, lng: 25.288333 }); // South

    const map = new google.maps.Map(this.elementRef.nativeElement, {
      center: bounds.getCenter(),
      scaleControl: true,
      panControl: false,
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_TOP,
        style: google.maps.ZoomControlStyle.SMALL
      }
    });
    map.fitBounds(bounds);
    this.navigatorService.addNavigatorControl(map);

    this.store.mapResolve(map);
    this.mapResolved = true;

    this.subscriptions.push(
      this.store.playgrounds$.subscribe((playgrounds) => {
        this.markers.forEach((marker) => marker.setMap(null));
        playgrounds.forEach((playground) => {
          const marker = new google.maps.Marker({
            map,
            position: playground.geo,
            title: playground.title,
            icon: 'assets/map-marker.svg'
          });
          this.markers.push(marker);
        });
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
