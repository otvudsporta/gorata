import { Component } from '@angular/core';

// TODO: Extract to a shared component and use it in IntroComponent
@Component({
  selector: 'Thanks',
  template: `
    <img src="assets/photo-thanks@2x.jpg" />

    <div class="pa-lg">
      <h1 class="mb-lg">{{i18n.title}}</h1>
      <p class="mb-lg">{{i18n.p1}}</p>

      <a class="block" routerLink="/playgrounds/new">
        <button class="w-100p bg-primary pa-md pv-sm ma-0 color-neutral-lighter b dim-and-grow" type="button"><img src="assets/ui-icon-diamond-plus.svg" alt="" class="inline-block va-middle" /> {{i18n.create}}</button>
      </a>

      <a class="flex jc-center ai-center pa-md mh-xs color-primary b dim" href="https://www.facebook.com/otvudsporta" target="_blank">
        <img class="facebook mh-xs" src="assets/facebook.svg" />
        {{i18n.facebook}}
      </a>
    </div>
  `,
  styles: [`
    p {
      line-height: 1.5;
    }

    .facebook {
      height: 1.4rem;
    }
  `]
})
export class ThanksComponent {
  i18n = {
    title: 'Благодарим ти!',
    p1: `
      Вече си част от общността на “Отвъд Спорта”!
      Можеш да въведеш още игрища или да помогнеш за подобряването на конкретно място като се свържеш с нас.
    `,
    create: 'Ново игрище',
    facebook: 'Последвай ни във Facebook'
  };
}
