import { Component, Input, Output, EventEmitter } from '@angular/core';

import { AuthService } from '../auth.service';
import { StoreService } from '../store.service';

@Component({
  selector: 'Header',
  template: `
    
    <!-- Този back btn се появява само във формата, но това е отвъд моите способности :) -->
    <div class="tl">
      <a class="btn_back" routerLink="/">
        <img src="assets/ui_icon_back.svg" alt="Върни се в началото" />
      </a>
    </div>

    <a class="logo__link" routerLink="/">
      <img class="logo__image" src="assets/logo.svg" alt="Отвъд Спорта Лого" />
    </a>

    <!--
    <a routerLink="/">Добави Игрище</a>
    <a routerLink="/playgrounds">Игрища</a>
    <a *ngIf="(store.user$ | async) == null" routerLink="/login">Вход</a>
    <a *ngIf="(store.user$ | async) != null" routerLink="/" (click)="logout()">Изход</a>
    -->

    <!--
    <div class="toggle border-primary br-md pointer" (click)="showSidebarChange.emit(!showSidebar)">
      <img class="toggle__image" [src]="showSidebar ? 'assets/chevron-up.svg' : 'assets/chevron-down.svg'" />
    </div>
    -->
  `,
  styles: [`
    :host {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      align-items: center;
      background: var(--neutral-lighter);
      padding: 1rem;
      height: 64px;
      text-align: center;
    }

    .btn_back {
      background-color: rgba(0,100,177,0.10);
      border-radius: 100%;
      display: inline-block;
      width: 32px;
      height: 32px;
      line-height: 32px;
      padding: 0 10px;
      transition: background-color 0.2s ease-in-out;
    }
    .btn_back:hover {
      background-color: rgba(0,100,177,0.20);
    }

    .logo__link {
      grid-column: 2;
    }

    .logo__link img {
      width: 32px;
    }

    .toggle {
      user-select: none;
      box-shadow: var(--box-shadow);
      width: 2rem;
      height: 2rem;
      line-height: 2rem;
      text-align: center;

      transition: background var(--transition-duration) var(--transition-easing);
    }

    .toggle:hover {
      background: rgba(0, 0, 0, 0.02);
    }

    .toggle__image {
      width: 1rem;
      height: 1rem;
    }
  `]
})
export class HeaderComponent {
  constructor(
    private authService: AuthService,
    public store: StoreService,
  ) {
  }

  @Input() showSidebar: boolean;
  @Output() showSidebarChange = new EventEmitter<boolean>();

  logout() {
    return this.authService.logout();
  }
}
