import './style.scss';

import { Keyboard } from 'compote/components/keyboard';
import { constant, get, set, when, equal } from 'compote/components/utils';
import * as firebase from 'firebase/app';
import { redraw, withAttr, FactoryComponent } from 'mithril';

import { FacebookLogo } from './facebook-logo';
import * as notify from '../notify';
import { route, Routes } from '../router';

interface State {
  email?: string;
  password?: string;
  loading?: boolean;
}

// TODO: Use form data
// TODO: Add validation
export const Login: FactoryComponent<State> = () => {
  const state: State = {};

  const setEmail = withAttr('value', set<State>('email')(state));
  const setPassword = withAttr('value', set<State>('password')(state));

  const login = async () => {
    try {
      state.loading = true;
      await firebase.auth().signInWithEmailAndPassword(state.email, state.password);
      route.set(Routes.HOME);
    }
    catch (error) {
      notify.error(error);
      state.loading = false;
      redraw();
    }
  };

  const loginOnEnter = when(equal(get<KeyboardEvent>('keyCode'), Keyboard.ENTER), login);

  return {
    view: () =>
      <div class="container fade-in-animation">
        <form class="form" onsubmit={returnFalse}>
          <fieldset class="form-panel" disabled={state.loading === true}>
            <button
              class="facebook-button width-100p br-md mb-xl bg-facebook pa-md color-neutral-light"
              type="button"
              onclick={loginWithFacebook}
            >
              {FacebookLogo({ class: 'mr-sm mv-n-sm' })}
              Вход с Facebook
            </button>
            <input
              class="form-input"
              type="email" name="email" placeholder="Имейл" autofocus required
              onkeyup={loginOnEnter} oninput={setEmail}
            />
            <br />
            <input
              class="form-input"
              type="password" name="password" placeholder="Парола" required
              onkeyup={loginOnEnter} oninput={setPassword}
            />
            <br />
            <button class="form-button" type="submit" onclick={login}>Вход</button>
          </fieldset>
        </form>
      </div>
  };
};

const returnFalse = constant(false);

const loginWithFacebook = async () => {
  try {
    await firebase.auth().signInWithRedirect(new firebase.auth.FacebookAuthProvider());
  }
  catch (error) {
    notify.error(error);
  }
};
