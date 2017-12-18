import { Component, OnInit, OnDestroy, ElementRef, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import {} from '@types/googlemaps';
import { Subscription } from 'rxjs/Subscription';

import { environment } from '../../environments/environment';
import { NavigatorService } from '../navigator.service';
import { Playground } from '../playground';
import { StoreService } from '../store.service';
import { loadScript } from '../utils';

// Source: https://mapstyle.withgoogle.com
// import mapStyles from './styles.json';

@Component({
  selector: 'Map',
  template: `
    <div>
      <Loader></Loader>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      color: var(--neutral-lighter);
    }
  `]
})
export class MapComponent implements OnInit, OnDestroy {
  private mapResolved: boolean;
  private subscriptions: Subscription[] = [];
  private markers: google.maps.Marker[] = [];
  private markerListeners: google.maps.MapsEventListener[] = [];

  constructor(
    private elementRef: ElementRef,
    private navigatorService: NavigatorService,
    private router: Router,
    private store: StoreService,
    private zone: NgZone
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
      // styles: mapStyles,
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
        this.removeAllMarkers();
        this.removeAllMarkerListeners();
        playgrounds.forEach((playground) => {
          const marker = new google.maps.Marker({
            map,
            position: playground.geo,
            title: playground.title,
            icon: 'assets/map-marker.svg'
          });
          this.markers.push(marker);
          this.addMarkerListener(marker, playground);
        });
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    this.subscriptions = [];
    this.removeAllMarkerListeners();
  }

  private removeAllMarkers() {
    this.markers.forEach((marker) => marker.setMap(null));
  }

  private addMarkerListener(marker: google.maps.Marker, playground: Playground) {
    this.markerListeners.push(
      marker.addListener('click', () => {
        this.zone.run(() => this.router.navigate(['playgrounds', playground.id]));
      })
    );
  }

  private removeAllMarkerListeners() {
    this.markerListeners.forEach((listener) => listener.remove());
    this.markerListeners = [];
  }
}
