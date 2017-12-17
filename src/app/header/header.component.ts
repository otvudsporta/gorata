import { Component } from '@angular/core';

import { AuthService } from '../auth.service';
import { StoreService } from '../store.service';

@Component({
  selector: 'Header',
  template: `
    <a class="logo-link" routerLink="/">
      <img class="logo-image" src="assets/logo.svg" alt="Отвъд Спорта Лого" />
    </a>

    <a routerLink="/">Добави Игрище</a>

    &nbsp;|&nbsp;

    <a routerLink="/playgrounds">Игрища</a>

    &nbsp;|&nbsp;

    <a *ngIf="(store.user$ | async) == null" routerLink="/login">Вход</a>

    <ng-container *ngIf="(store.user$ | async) != null">
      <a *ngIf="(store.user$ | async) != null" routerLink="/" (click)="logout()">Изход</a>
    </ng-container>
  `,
  styles: [`
    :host {
      display: flex;
      align-items: center;
      background: var(--neutral-lighter);
    }

    .logo-link {
      display: flex;
      align-items: center;
    }

    .logo-image {
      width: 64px;
      margin: 6px;
    }
  `]
})
export class HeaderComponent {
  constructor(
    private authService: AuthService,
    public store: StoreService,
  ) {
  }

  logout() {
    return this.authService.logout();
  }
}
