import { Keyboard } from 'compote/components/keyboard';
import { constant, get, set, when, equal } from 'compote/components/utils';
import * as firebase from 'firebase/app';
import { redraw, withAttr } from 'mithril';

import * as notify from '../notify';
import { route, Routes } from '../router';

interface State {
  email?: string;
  password?: string;
  passwordConfirmation?: string;
  loading?: boolean;
}

// TODO: Use form data
// TODO: Add validation
export const Register: FnComponent<State> = () => {
  const state: State = {};

  const setEmail = withAttr('value', set<State>('email')(state));
  const setPassword = withAttr('value', set<State>('password')(state));
  const setPasswordConfirmation = withAttr('value', set<State>('passwordConfirmation')(state));

  const register = async () => {
    if (state.password !== state.passwordConfirmation) {
      notify.error(`Паролата не съвпада с потвърждението! Моля, опитайте отново!`);
      return;
    }

    try {
      state.loading = true;
      await firebase.auth().createUserWithEmailAndPassword(state.email, state.password);
      route.set(Routes.HOME);
    }
    catch (error) {
      notify.error(error);
      state.loading = false;
      redraw();
    }
  };

  const registerOnEnter = when(equal(get<KeyboardEvent>('keyCode'), Keyboard.ENTER), register);

  return {
    view: () =>
      <form class="form" onsubmit={returnFalse}>
        <fieldset class="form-panel" disabled={state.loading === true}>
          <input
            class="form-input"
            type="email" name="email" placeholder="Имейл" autofocus required
            onkeyup={registerOnEnter} oninput={setEmail}
          />
          <br />
          <input
            class="form-input"
            type="password" name="password" placeholder="Парола" required
            onkeyup={registerOnEnter} oninput={setPassword}
          />
          <input
            class="form-input"
            type="password" name="password_confirmation" placeholder="Потвърдете паролата" required
            onkeyup={registerOnEnter} oninput={setPasswordConfirmation}
          />
          <br />
          <button class="form-button" type="submit" onclick={register}>Регистрация</button>
        </fieldset>
      </form>
  };
};

const returnFalse = constant(false);
