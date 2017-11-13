import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { FileUploadService } from '../file-upload.service';
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
  subscriptions: Subscription[] = [];
  mapEventListeners: google.maps.MapsEventListener[] = [];

  uploading: boolean;
  loading: boolean;
  marker: google.maps.Marker;
  playground: Partial<Playground> = {
    imageUrls: [],
    sports: {},
    needs: {}
  };

  // TODO: Move into database
  i18n = {
    upload: { title: 'Качете снимка' },
    title: { placeholder: 'Как се казва игрището?' },
    address: { placeholder: 'Къде се намира?' },
    sports: { label: 'За какви спортове е предназначено?' },
    needs: { label: 'От какво има нужда игрището?' },
    text: { placeholder: 'Допълнителни коментари' },
    button: { content: 'Добави игрище' },

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
    private playgroundService: PlaygroundService,
    private router: Router,
    private store: StoreService
  ) {
  }

  async ngOnInit() {
    this.subscriptions.push(
      this.store.user$.subscribe((user) => this.user = user)
    );

    const map = await this.store.map;
    this.mapEventListeners.push(
      map.addListener('click', (e: google.maps.MouseEvent) => this.createRequestMarker(map, e.latLng))
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
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

  uploadImage = (file: File) => new Promise(async (resolve, reject) => {
    const uploadTaskSnapshot = await this.fileUploadService.upload(`tmp/${guid()}`, file);

    // Only redraw after the image is loaded
    const image = document.createElement('img');
    image.src = uploadTaskSnapshot.downloadURL;
    image.onload = () => {
      this.playground.imageUrls.push(uploadTaskSnapshot.downloadURL);
      resolve();
    };
  })

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

  create(marker: google.maps.Marker, playground: Playground) {
    if (!marker) throw new Error(this.i18n.errors.marker.required);
    if (!playground.title) throw new Error(this.i18n.errors.title.required);
    if (!playground.address) throw new Error(this.i18n.errors.address.required);

    const newPlayground: Partial<Playground> = {
      ...playground,
      geo: marker.getPosition().toJSON(),
      createdBy: this.user.uid
    };

    this.loading = true;
    this.playgroundService.create(newPlayground)
      .then(() => this.router.navigate(['/']))
      .catch(() => this.loading = false)
    ;
  }

  // TODO: Extract to class
  async createRequestMarker(map: google.maps.Map, position: google.maps.LatLng, address?: string) {
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
