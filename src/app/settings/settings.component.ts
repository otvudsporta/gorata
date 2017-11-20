import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'Settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  constructor() {
  }

  // TODO: Move to database
  i18n = {
    facebookLinkAccount: 'Свързване на Facebook акаунт'
  };

  ngOnInit() {
  }

  facebookLinkAccount() {
    // TODO
  }
}
