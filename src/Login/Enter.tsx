import './style.scss';

import { Login } from './Login';
import { Register } from './Register';

// TODO: Use form data
// TODO: Add validation
export const Enter: FnComponent = () => ({
  view: () =>
    <div class="container fade-in-animation">
      <Login />
      <div class="enter-login-or-register">или</div>
      <Register />
    </div>
});
