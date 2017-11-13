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
  data = <PlaygroundFormData>{
    imageUrls: []
  };

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
    this.destroyMarker(this.data.marker);
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
      this.data.imageUrls.push(uploadTaskSnapshot.downloadURL);
      resolve();
    };
  })

  async removeImage(imageUrl: string) {
    const indexOfImageUrl = this.data.imageUrls.indexOf(imageUrl);
    if (indexOfImageUrl === -1) return;

    this.data.imageUrls.splice(indexOfImageUrl, 1);
    try {
      await this.fileUploadService.delete(imageUrl);
    }
    catch (error) {
      this.data.imageUrls.splice(indexOfImageUrl, 0, imageUrl);
    }
  }

  create(data: PlaygroundFormData) {
    if (!data.marker) throw new Error('Моля, маркирайте мястото върху картата!');
    if (!data.title) throw new Error('Моля, въведете местоположението на площадката!');
    if (!data.text) throw new Error('Моля, въведете описание на площадката!');

    this.loading = true;

    const newPlayground: Partial<Playground> = {
      title: data.title,
      text: data.text,
      imageUrls: data.imageUrls,
      geo: data.marker.getPosition().toJSON(),
      createdBy: this.user.uid
    };

    this.playgroundService.create(newPlayground)
      .then(() => this.router.navigate(['/']))
      .catch(() => this.loading = false)
    ;
  }

  // TODO: Extract to class
  async createRequestMarker(map: google.maps.Map, position: google.maps.LatLng, address?: string) {
    this.destroyMarker(this.data.marker);
    this.data.marker = new google.maps.Marker({ map, position, icon: 'assets/map-marker-create.svg' });

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

interface PlaygroundFormData {
  marker: google.maps.Marker;
  imageUrls: string[];
  title: string;
  text: string;
}
