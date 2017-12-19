import { Component } from '@angular/core';

@Component({
  selector: 'Intro',
  template: `
    <img src="assets/photo-intro@2x.jpg" />

    <div class="pa-lg">
      <h1 class="mb-lg">{{i18n.title}}</h1>
      <p class="mb-lg">{{i18n.p1}}</p>
      <p class="mb-lg">{{i18n.p2}}</p>

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
    :host {
      display: block;
    }

    p {
      line-height: 1.5;
    }

    .facebook {
      height: 1.4rem;
    }
  `]
})
export class IntroComponent {
  i18n = {
    title: 'Добре дошъл в “Отвъд Спорта”',
    p1: '“Отвъд Спорта” обединява хора около спортуването на открито като израз на свобода, свързване и обич към играта.',
    p2: 'Тук можеш да дадеш своя принос към каузата като добавиш игрището в квартала или училищния двор. Така ще ни помогнеш да съберем на едно място всички игрища и разберем нуждите им, за да привличат повече хора като нас.',
    create: 'Ново игрище',
    facebook: 'Последвай ни във Facebook'
  };
}
