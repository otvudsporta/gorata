import { Component, OnInit, OnDestroy, AfterViewInit, ChangeDetectorRef, Input, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { FileUploadService } from '../file-upload.service';
import { NotificationsService } from '../notifications.service';
import { Playground } from '../playground';
import { PlaygroundService } from '../playground.service';
import { StoreService, User } from '../store.service';
import { toArray, guid } from '../utils';

@Component({
  selector: 'PlaygroundCreate',
  templateUrl: './playground-create.component.html',
  styleUrls: ['./playground-create.component.css'],
})
export class PlaygroundCreateComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor(
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
  subscriptions: Subscription;
  mapEventListeners: google.maps.MapsEventListener[] = [];

  uploading: boolean;
  loading: boolean;
  marker: google.maps.Marker;
  addressSuggestion: string;

  // TODO: Move into database
  i18n = {
    upload: { title: 'Качете снимка' },
    title: { placeholder: 'Как се казва игрището?' },
    address: { placeholder: 'Къде се намира?', suggestion: 'Може би имахте предвид {{address}}?' },
    sports: { label: 'За какви спортове е предназначено?' },
    needs: { label: 'От какво има нужда игрището?' },
    text: { placeholder: 'Допълнителни коментари' },
    button: { create: 'Добави игрище', update: 'Запази промените' },

    success: {
      create: 'Площадката е добавена успешно',
      update: 'Промените са запазени успешно'
    },
    errors: {
      marker: {
        required: 'Моля, маркирайте мястото върху картата!'
      },
      title: {
        required: 'Моля, въведете името на площадката!'
      },
      address: {
        required: 'Моля, въведете местоположението на площадката!'
      }
    },
    google: {
      ZERO_RESULTS: 'Няма резултати!'
    }
  };
  sports = ['футбол', 'баскетбол', 'волейбол', 'тенис на маса', 'тенис на стена', 'бадминтон'];
  needs = ['обновяване', 'почистване', 'привличане на хора'];

  // Lifecycle hooks
  async ngOnInit() {
    this.subscriptions = new Subscription();
    this.subscriptions.add(
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
    this.subscriptions.unsubscribe();
    this.mapEventListeners.forEach((listener) => listener.remove());
    this.destroyMarker(this.marker);
  }

  // Methods
  async uploadImages(fileList: FileList) {
    const files = toArray<File>(fileList);
    if (!files.length) return;

    this.uploading = true;

    try {
      await Promise.all(files.map(this.uploadImage));
    }
    finally {
      this.uploading = false;
    }
  }

  uploadImage(file: File) {
    return new Promise(async (resolve, reject) => {
      const uploadTaskSnapshot = await this.fileUploadService.upload(`tmp/${guid()}`, file);

      // Only redraw after the image is loaded
      const image = document.createElement('img');
      image.src = uploadTaskSnapshot.downloadURL;
      image.onload = () => {
        this.playground.imageUrls.push(uploadTaskSnapshot.downloadURL);
        resolve();
      };
    });
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

    const newPlayground: Partial<Playground> = {
      ...playground,
      geo: marker.getPosition().toJSON(),
    };

    const isNew = playground.id == null;
    this.loading = true;
    return (
      this[isNew ? 'create' : 'update'](newPlayground)
        .then(() => {
          this.notify.success(this.i18n.success[isNew ? 'create' : 'update']);
        })
        .catch((error) => {
          this.notify.error(error && error.message || error);
          this.loading = false;
        })
    );
  }

  private validate(marker: google.maps.Marker, playground: Partial<Playground>) {
    if (!marker) throw new Error(this.i18n.errors.marker.required);
    if (!playground.title) throw new Error(this.i18n.errors.title.required);
    if (!playground.address) throw new Error(this.i18n.errors.address.required);
  }

  private create(playground: Partial<Playground>) {
    return (
      this.playgroundService.create({ ...playground, createdBy: this.user.uid })
        .then(() => this.router.navigate(['/']))
    );
  }

  private update(playground: Partial<Playground>) {
    return (
      this.playgroundService.update(playground)
        .then(() => this.router.navigate(['playgrounds', playground.id]))
    );
  }
}
