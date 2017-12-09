import { Component, AfterViewInit, OnDestroy, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { StoreService } from '../store.service';

@Component({
  selector: 'AddressInput',
  templateUrl: './address-input.component.html',
  styleUrls: ['./address-input.component.css']
})
export class AddressInputComponent implements AfterViewInit, OnDestroy {
  constructor(
    public store: StoreService
  ) {
  }

  @ViewChild('addressInput') private addressInput: ElementRef;

  @Input() name?: string;
  @Input() placeholder?: string;
  @Input() address: string;
  @Output() addressChanged = new EventEmitter();

  suggestion: string;

  // TODO: Move into database
  i18n = {
    suggestion: 'Може би имахте предвид {{address}}?',
    noResults: 'Няма резултати!',
  };

  private mapEventListeners: google.maps.MapsEventListener[] = [];

  ngAfterViewInit() {
    this.createSearchBox(this.addressInput.nativeElement);
  }

  ngOnDestroy() {
    this.mapEventListeners.forEach((listener) => listener.remove());
  }

  private async createSearchBox(input: HTMLInputElement) {
    const map = await this.store.map;

    const searchBox = new google.maps.places.SearchBox(input);

    this.mapEventListeners.push(
      map.addListener('bounds_changed', () => searchBox.setBounds(map.getBounds()))
    );

    searchBox.addListener('places_changed', () => {
      const places = searchBox.getPlaces();

      const [place] = places;
      if (!(place && place.geometry)) return;

      const { location } = place.geometry;

      map.panTo(location);

      const minZoom = 17;
      if (map.getZoom() < minZoom) {
        map.setZoom(minZoom);
      }

      // TODO: Uncomment if necessary
      // this.address = input.value;
    });
  }

  setAddressToSuggestion() {
    this.address = this.suggestion;
    this.suggestion = null;
  }

  private getAddressByLocation(location: google.maps.LatLng) {
    return new Promise<string>((resolve, reject) => {
      const service = new google.maps.Geocoder();
      service.geocode({ location }, (results, status) => {
        const [result] = results;
        if (!result || (status !== google.maps.GeocoderStatus.OK && status !== google.maps.GeocoderStatus.ZERO_RESULTS)) {
          reject(this.i18n.noResults);
          return;
        }

        resolve(result.formatted_address);
      });
    });
  }
}
