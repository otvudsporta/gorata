import './style.scss';
import '../assets/logo.png';

import { flex } from 'compote/components/flex';

import { logout } from '../Logout/Logout';
import { route, Routes } from '../router';
import { store } from '../store';
import { CurrentUser, isLoggedIn, canAdmin } from '../User/User';
import { UserProfileImage } from '../UserProfileImage/UserProfileImage';

export const Header = {
  view() {
    const { currentUser } = store.getState();

    // Don't show the logged out state until the user is known to be either logged in or logged out
    return [
      <MenuIcon />
      ,
      <Logo />
      ,
      <a class="menu-link br-md pa-md" oncreate={route.link} href={Routes.HOME}>Заявки</a>,
      isLoggedIn(currentUser) ?
        <a class="menu-link br-md pa-md" oncreate={route.link} href={Routes.REQUEST_CREATE}>Нова Заявка</a>
        :
        null
      ,
      canAdmin(currentUser) ?
        <a
          class="menu-link br-md pa-md hidden-xxs hidden-xs"
          target="_blank"
          rel="noopener"
          href={`https://console.firebase.google.com/project/${process.env.FIREBASE_PROJECT_ID}/database/data`}
        >База Данни</a>
        :
        null
      ,
      <div style={flex(1)}></div>
      ,
      currentUser != null ?
        isLoggedIn(currentUser) ? UserMenu(currentUser) : LoginLinks()
        :
        null
    ];
  }
};

const MenuIcon = () => ({
  view: () =>
    <svg
      class="menu-icon mr-md br-md pa-md pointer hidden-sm hidden-md hidden-lg hidden-xl hidden-xxl"
      viewBox="0 0 32 32"
      onclick={toggleContent}
    >
      <path d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2 s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z" />
    </svg>
});

const toggleContent = (e: MouseEvent) => {
  (e.currentTarget as HTMLElement).classList.toggle('active');
  const content = document.querySelector('#content');
  content.classList.toggle('collapsed');
};

const Logo = () => ({
  view: () =>
    <div id="logo" class="mr-md hidden-xxs hidden-xs flex-row align-items-center">
      <img class="pa-sm" src="logo.png" alt="Лого" />
      <h1 class="hidden-sm">Отвъд Спорта</h1>
    </div>
});

const UserMenu = ({ profile, role }: CurrentUser) => (
  <div class="flex-row align-items-center">
    <div class="text-right">
      {profile != null ? <div class="color-neutral-lighter hidden-xxs hidden-xs" title={role || ''}>{profile.name}</div> : null}
      <a class="color-neutral-lighter" onclick={logout}>Изход</a>
    </div>
    <a class="color-neutral-lighter ml-md" oncreate={route.link} href={Routes.SETTINGS}>
      <UserProfileImage class="width-sm height-sm" title="Настройки" profile={profile} />
    </a>
  </div>
);

const LoginLinks = () => [
  <a class="color-neutral-lighter mr-md" oncreate={route.link} href={Routes.REGISTER}>Регистрация</a>
  ,
  <a class="color-neutral-lighter" oncreate={route.link} href={Routes.LOGIN}>Вход</a>
];
