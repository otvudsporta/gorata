import { NgModule } from '@angular/core';
import { RouterModule as NgRouterModule, Routes } from '@angular/router';

import { PlaygroundListComponent } from './playground-list/playground-list.component';
import { PlaygroundCreateComponent } from './playground-create/playground-create.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: '', component: PlaygroundListComponent },
  { path: 'new', component: PlaygroundCreateComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [
    NgRouterModule.forRoot(routes)
  ],
  exports: [NgRouterModule]
})
export class RouterModule {
}
