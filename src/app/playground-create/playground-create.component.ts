import { Component, OnInit, OnDestroy, Input } from '@angular/core';
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
  styleUrls: ['./playground-create.component.css']
})
export class PlaygroundCreateComponent implements OnInit, OnDestroy {
  user: User;
  subscriptions: Subscription;
  mapEventListeners: google.maps.MapsEventListener[] = [];

  uploading: boolean;
  loading: boolean;
  marker: google.maps.Marker;

  @Input() playground = this.playgroundService.getDefault();

  // TODO: Move into database
  i18n = {
    unauthenticated: 'Преди да добавите ново игрище, моля влезте с акаунта си или се регистрирайте',

    upload: { title: 'Качете снимка' },
    title: { placeholder: 'Как се казва игрището?' },
    address: { placeholder: 'Къде се намира?' },
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
    }
  };
  sports = ['футбол', 'баскетбол', 'волейбол', 'тенис на маса', 'тенис на стена', 'бадминтон'];
  needs = ['обновяване', 'почистване', 'привличане на хора'];

  constructor(
    private fileUploadService: FileUploadService,
    private notify: NotificationsService,
    private playgroundService: PlaygroundService,
    private router: Router,
    public store: StoreService
  ) {
  }

  async ngOnInit() {
    const map = await this.store.map;

    if (this.playground && this.playground.geo) {
      this.setMarker(map, new google.maps.LatLng(this.playground.geo.lat, this.playground.geo.lng));
    }

    this.subscriptions = new Subscription();
    this.subscriptions.add(
      this.store.user$.subscribe((user) => this.user = user)
    );

    this.mapEventListeners.push(
      map.addListener('click', (e: google.maps.MouseEvent) => this.setMarker(map, e.latLng))
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    this.mapEventListeners.forEach((listener) => listener.remove());
    this.destroyMarker(this.marker);
  }

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

  save(marker: google.maps.Marker, playground: Partial<Playground>) {
    if (!marker) throw new Error(this.i18n.errors.marker.required);
    if (!playground.title) throw new Error(this.i18n.errors.title.required);
    if (!playground.address) throw new Error(this.i18n.errors.address.required);

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

  create(playground: Partial<Playground>) {
    return (
      this.playgroundService.create({ ...playground, createdBy: this.user.uid })
        .then(() => this.router.navigate(['/']))
    );
  }

  update(playground: Partial<Playground>) {
    return (
      this.playgroundService.update(playground)
        .then(() => this.router.navigate(['playgrounds', playground.id]))
    );
  }

  // TODO: Extract to class
  async setMarker(map: google.maps.Map, position: google.maps.LatLng, address?: string) {
    this.destroyMarker(this.marker);
    this.marker = new google.maps.Marker({ map, position, icon: 'assets/map-marker-create.svg' });

    // if (!address) {
    //   try {
    //     address = await getAddressByLocation(position);
    //   }
    //   catch (error) {
    //     return;
    //   }
    // }

    // if (address !== state.request.title) {
    //   state.addressSuggestion = address;
    // }
  }

  destroyMarker(marker: google.maps.Marker) {
    if (marker) {
      marker.setMap(null);
    }
  }
}
