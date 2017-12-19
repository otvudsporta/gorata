import { Component, Input } from '@angular/core';

// import { AuthService } from '../auth.service';
import { StoreService } from '../store.service';

@Component({
  selector: 'Header',
  template: `
    <div class="tl">
      <a class="backButton" [class.--hidden]="routeLevel === 0" routerLink="/">
        <img src="assets/ui_icon_back.svg" [alt]="i18n.back" />
      </a>
    </div>

    <a class="logo" routerLink="/">
      <img class="logo__image" src="assets/logo.svg" [alt]="i18n.logo" />
    </a>

    <!--
    <a routerLink="/">Добави Игрище</a>
    <a routerLink="/playgrounds">Игрища</a>
    <a *ngIf="(store.user$ | async) == null" routerLink="/login">Вход</a>
    <a *ngIf="(store.user$ | async) != null" routerLink="/" (click)="logout()">Изход</a>
    -->
  `,
  /* `min-height` in addition to `height` fixed an issue with flexbox on Chrome */
  styles: [`
    :host {
      display: grid;
      grid-template-columns: 1fr 2fr 1fr;
      align-items: center;
      background: var(--neutral-lighter);
      padding: 1rem;
      height: 64px;
      min-height: 64px;
      text-align: center;
    }

    .backButton {
      border-radius: 100%;
      display: flex;
      width: 32px;
      height: 32px;
      line-height: 32px;
      padding: 0 10px;

      transition: all var(--transition-duration) var(--transition-easing);
      transition-property: background, opacity;
      background: rgba(0, 100, 177, 0.10);
      opacity: 1;
    }

    .backButton:hover {
      background: rgba(0, 100, 177, 0.20);
    }

    .backButton.--hidden {
      opacity: 0;
    }

    .logo {
      grid-column: 2;
    }

    .logo__image {
      width: 32px;
    }
  `]
})
export class HeaderComponent {
  constructor(
    // private authService: AuthService,
    public store: StoreService,
  ) {
  }

  @Input() routeLevel: number;

  i18n = {
    back: 'Върни се в началото',
    logo: 'Отвъд Спорта',
  };

  // logout() {
  //   return this.authService.logout();
  // }
}
