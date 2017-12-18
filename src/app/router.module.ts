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
  { path: '', component: IntroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'playgrounds', component: PlaygroundListComponent },
  { path: 'playgrounds/new', component: PlaygroundCreateComponent },
  { path: 'playgrounds/:id', component: PlaygroundDetailsComponent },
  { path: 'playgrounds/:id/edit', component: PlaygroundEditComponent },
  // { path: 'settings', component: SettingsComponent },
  { path: 'thanks', component: ThanksComponent },
];

@NgModule({
  imports: [
    NgRouterModule.forRoot(routes)
  ],
  exports: [NgRouterModule]
})
export class RouterModule {
}
