import { Component, OnInit, OnDestroy, AfterViewInit, ChangeDetectorRef, Input, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from '../auth.service';
import { FileUploadService } from '../file-upload.service';
import { NotificationsService } from '../notifications.service';
import { Playground } from '../playground';
import { PlaygroundService } from '../playground.service';
import { StoreService, User } from '../store.service';
import { toArray, guid, loadImageIntoCache } from '../utils';

@Component({
  selector: 'PlaygroundCreate',
  templateUrl: './playground-create.component.html',
  styleUrls: ['./playground-create.component.css'],
})
export class PlaygroundCreateComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor(
    private authService: AuthService,
    private changeDetector: ChangeDetectorRef,
    private fileUploadService: FileUploadService,
    private notify: NotificationsService,
    private playgroundService: PlaygroundService,
    private router: Router,
    public store: StoreService,
  ) {
  }

  @Input() playground = this.playgroundService.getDefault();
  @ViewChild('addressInput') addressInput: ElementRef;

  user: User;
  subscriptions: Subscription[] = [];
  mapEventListeners: google.maps.MapsEventListener[] = [];

  uploading: boolean;
  loading: boolean;
  marker: google.maps.Marker;
  addressSuggestion: string;

  // TODO: Move into database
  i18n = {
    details: 'Данни за игрището',
    address: {
      label: 'Адрес на игрището',
      placeholder: 'Отбележи на картата / потърси по адрес',
      suggestion: 'Може би имате предвид',
      button: '✔ Да'
    },
    title: {
      label: 'Име на игрището',
      placeholder: 'Как се казва игрището?'
    },
    sports: { label: 'За какви спортове е предназначено?' },
    needs: { label: 'От какво има нужда игрището?' },
    images: { label: 'Добави снимки', description: 'Тази стъпка не е задължителна', button: 'Добави снимки' },
    text: { label: 'Допълнителни коментари', description: 'Това поле не е задължително', placeholder: 'Допълнителни коментари' },
    name: { placeholder: 'Твоето име' },
    email: { placeholder: 'E-mail за връзка' },
    button: { create: 'Добави игрището', update: 'Запази промените' },

    success: {
      update: 'Промените са запазени успешно'
    },
    errors: {
      marker: { required: 'Моля, маркирайте мястото върху картата!' },
      title: { required: 'Моля, въведете името на площадката!' },
      address: { required: 'Моля, въведете местоположението на площадката!' },
      name: { required: 'Моля, въведете името си!' },
      email: { required: 'Моля, въведете имейл за контакт!' }
    },
    google: {
      ZERO_RESULTS: 'Няма резултати!'
    }
  };
  sports = ['футбол', 'баскетбол', 'волейбол', 'тенис на маса', 'тенис на стена'];
  needs = ['обновяване', 'почистване', 'привличане на спортуващи'];

  // Lifecycle hooks
  async ngOnInit() {
    this.subscriptions.push(
      this.store.user$.subscribe((user) => this.user = user)
    );

    const map = await this.store.map;

    if (this.playground && this.playground.geo) {
      this.setMarker(map, new google.maps.LatLng(this.playground.geo.lat, this.playground.geo.lng));
    }

    this.mapEventListeners.push(
      map.addListener('click', (e: google.maps.MouseEvent) => this.setMarker(map, e.latLng))
    );
  }

  ngAfterViewInit() {
    this.createSearchBox(this.addressInput.nativeElement);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    this.subscriptions = [];
    this.mapEventListeners.forEach((listener) => listener.remove());
    this.mapEventListeners = [];
    this.destroyMarker(this.marker);
  }

  // Methods
  async uploadImages(fileList: FileList) {
    const files = toArray<File>(fileList);
    if (!files.length) return;

    this.uploading = true;

    try {
      await Promise.all(files.map(async (file) => {
        const uploadTaskSnapshot = await this.fileUploadService.upload(`tmp/${guid()}`, file);

        try {
          await loadImageIntoCache(uploadTaskSnapshot.downloadURL);
        }
        catch (error) {
          // Ignore error
        }
        this.playground.imageUrls.push(uploadTaskSnapshot.downloadURL);
      }));
    }
    catch (error) {
      throw error;
    }
    finally {
      this.uploading = false;
    }
  }

  async removeImage(imageUrl: string) {
    const indexOfImageUrl = this.playground.imageUrls.indexOf(imageUrl);
    if (indexOfImageUrl === -1) return;

    this.playground.imageUrls.splice(indexOfImageUrl, 1);
    try {
      await this.fileUploadService.delete(imageUrl);
    }
    catch (error) {
      this.playground.imageUrls.splice(indexOfImageUrl, 0, imageUrl);
    }
  }

  // Address
  async createSearchBox(input: HTMLInputElement) {
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

      this.setMarker(map, location, place.formatted_address);
    });
  }

  setAddressToSuggestion() {
    this.playground.address = this.addressSuggestion;
    this.addressSuggestion = null;
    // NOTE: Because the address input is outside of Angular,
    // change detection has to be run manually here
    this.changeDetector.detectChanges();
  }

  private async setMarker(map: google.maps.Map, position: google.maps.LatLng, address?: string) {
    this.destroyMarker(this.marker);
    this.marker = new google.maps.Marker({ map, position, icon: 'assets/map-marker-create.svg' });

    if (!address) {
      try {
        address = await this.getAddressByLocation(position);
      }
      catch (error) {
        this.notify.error(error && error.message || error);
        return;
      }
    }

    if (address !== this.playground.address) {
      this.addressSuggestion = address;
      this.changeDetector.detectChanges();
    }
  }

  private destroyMarker(marker: google.maps.Marker) {
    if (marker) {
      marker.setMap(null);
    }
  }

  private getAddressByLocation(location: google.maps.LatLng) {
    return new Promise<string>((resolve, reject) => {
      const service = new google.maps.Geocoder();
      service.geocode({ location }, (results, status) => {
        const [result] = results;
        if (!result || (status !== google.maps.GeocoderStatus.OK && status !== google.maps.GeocoderStatus.ZERO_RESULTS)) {
          reject(this.i18n.google.ZERO_RESULTS);
          return;
        }

        resolve(result.formatted_address);
      });
    });
  }

  // Saving
  save(marker: google.maps.Marker, playground: Partial<Playground>) {
    this.validate(marker, playground);

    const isNew = playground.id == null;
    const newPlayground: Partial<Playground> = {
      createdBy: this.user.uid, // Only on create
      ...playground,
      geo: marker.getPosition().toJSON()
    };

    this.loading = true;
    this.playgroundService[isNew ? 'create' : 'update'](newPlayground)
      .then((id) => {
        if (isNew) {
          this.router.navigate(['thanks']);
        }
        else {
          this.notify.success(this.i18n.success[isNew ? 'create' : 'update']);
          this.router.navigate(['playgrounds', id]);
        }
      })
      .catch((error) => {
        this.notify.error(error && error.message || error);
        this.loading = false;
      })
    ;
  }

  private validate(marker: google.maps.Marker, playground: Partial<Playground>) {
    if (!marker) throw new Error(this.i18n.errors.marker.required);
    if (!playground.address) throw new Error(this.i18n.errors.address.required);
    if (!playground.title) throw new Error(this.i18n.errors.title.required);
    if (!playground.name) throw new Error(this.i18n.errors.name.required);
    if (!playground.email) throw new Error(this.i18n.errors.email.required);
  }
}
