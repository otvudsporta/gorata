import { Injectable } from '@angular/core';

import { NotificationsService } from './notifications.service';
import { createElement as h } from './utils';

@Injectable()
export class NavigatorService {
  constructor(private notify: NotificationsService) {
  }

  private userLocationZoomLevel = 18;

  addNavigatorControl(map: google.maps.Map) {
    if (window.navigator && window.navigator.geolocation) {
      const navigator = this.Navigator(map);
      map.controls[google.maps.ControlPosition.RIGHT_TOP].push(navigator);
    }
  }

  private Navigator(map: google.maps.Map) {
    return (
      h('div', {
        class: 'navigator pointer br-md bg-neutral-lighter mr-md',
        title: 'Покажи моето местоположение',
        onclick: this.getUserLocation(map)
      }, [
        h('div', { class: 'navigator-dot br-50p' })
      ])
    );
  }

  private getUserLocation(map: google.maps.Map) {
    return (e: MouseEvent) => {
      window.navigator.geolocation.getCurrentPosition(
        // Success
        (result) => {
          const location = new google.maps.LatLng(result.coords.latitude, result.coords.longitude);
          map.panTo(location);
          map.set('zoom', this.userLocationZoomLevel);
        },
        // Error
        (error) => {
          const errorMessage = this.getLocationError(error);
          if (errorMessage) {
            this.notify.error(errorMessage);
          }
        }
      );
    };
  }

  private getLocationError(error: PositionError) {
    switch (error.code) {
    case error.POSITION_UNAVAILABLE:
      return 'Браузърът не успя да установи местоположението Ви';
    case error.TIMEOUT:
      return 'Търсенето на местоположението Ви отне прекалено дълго време';
    case error.PERMISSION_DENIED:
      return null;
    default:
      return 'Неочаквана грешка при търсенето на местоположението Ви';
    }
  }
}
