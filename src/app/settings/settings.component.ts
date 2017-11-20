import { AuthService } from '../auth.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'Settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  constructor(private authService: AuthService, private notificationsService: NotificationsService ) {
  }

  // TODO: Move to database
  i18n = {
    facebookLinkAccount: 'Свързване на Facebook акаунт',
    success: 'Успешно свързахте акаунта си!'
  };

  ngOnInit() {
  }

  facebookLinkAccount() {
    this.authService.facebookLinkAccount()
      .then(() => this.notificationsService.success(this.i18n.success))
      .catch((error) => this.notificationsService.error(error && error.message || error))
    ;
  }
}
