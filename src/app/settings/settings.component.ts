import { AuthService } from '../auth.service';
import { Component } from '@angular/core';
import { NotificationsService } from '../notifications.service';

@Component({
  selector: 'Settings',
  template: `
    <button (click)="facebookLinkAccount()">
      <img src="assets/facebook.svg" />
      {{i18n.facebookLinkAccount}}
    </button>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class SettingsComponent {
  constructor(private authService: AuthService, private notify: NotificationsService) {
  }

  // TODO: Move to database
  i18n = {
    facebookLinkAccount: 'Свързване на Facebook акаунт',
    success: 'Успешно свързахте акаунта си!'
  };

  facebookLinkAccount() {
    // this.authService.facebookLinkAccount()
    //   .then(() => this.notify.success(this.i18n.success))
    //   .catch((error) => this.notify.error(error && error.message || error))
    // ;
  }
}
