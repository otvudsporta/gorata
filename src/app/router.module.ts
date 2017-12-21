import { NgModule } from '@angular/core';
import { RouterModule as NgRouterModule, Routes } from '@angular/router';

import { IntroComponent } from './intro/intro.component';
import { LoginComponent } from './login/login.component';
import { PlaygroundCreateComponent } from './playground-create/playground-create.component';
import { PlaygroundListComponent } from './playground-list/playground-list.component';
import { PlaygroundDetailsComponent } from './playground-details/playground-details.component';
import { PlaygroundEditComponent } from './playground-edit/playground-edit.component';
// import { SettingsComponent } from './settings/settings.component';
import { ThanksComponent } from './thanks/thanks.component';

export const routes: Routes = [
  { path: '', component: IntroComponent, data: { level: 0 } },
  { path: 'playgrounds/new', component: PlaygroundCreateComponent, data: { level: 1 } },
  { path: 'thanks', component: ThanksComponent, data: { level: 2 } },

  { path: 'playgrounds', component: PlaygroundListComponent, data: { level: 1 } },
  { path: 'playgrounds/:id', component: PlaygroundDetailsComponent, data: { level: 2 } },
  { path: 'playgrounds/:id/edit', component: PlaygroundEditComponent, data: { level: 3 } },

  { path: 'login', component: LoginComponent, data: { level: 1 } },
  // { path: 'settings', component: SettingsComponent, data: { level: 2 } },

  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [
    NgRouterModule.forRoot(routes)
  ],
  exports: [NgRouterModule]
})
export class RouterModule {
}
