import { Component, OnInit, ElementRef } from '@angular/core';
import {} from '@types/googlemaps';

import { environment } from '../../environments/environment';
import { loadScript } from '../utils';
import { StoreService } from '../store.service';

@Component({
  selector: 'Map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  private mapResolved: boolean;

  constructor(private elementRef: ElementRef, private store: StoreService) {
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

    this.store.mapResolve(map);
    this.mapResolved = true;
  }
}
