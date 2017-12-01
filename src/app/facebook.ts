/// <reference path="./facebook.d.ts" />
import { environment } from '../environments/environment';

let facebookAPIResolve: Function;
const FacebookAPI = new Promise<any>((resolve) => facebookAPIResolve = resolve);

(<any>window).fbAsyncInit = function () {
  FB.init({
    appId            : environment.FACEBOOK_APP_ID,
    autoLogAppEvents : true,
    version          : 'v2.11',
    // Automatically initialize other Facebook controls, e.g. social plugins
    xfbml            : true
  });

  facebookAPIResolve(FB);
};

(function (d, s, id) {
   const fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) return;

   const js = <HTMLScriptElement>d.createElement(s);
   js.id = id;
   js.src = 'https://connect.facebook.net/bg_BG/sdk.js';
   fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

export const api = (fields?: string[]) => new Promise<any>(async (resolve, reject) => {
  await FacebookAPI;
  FB.api(`/me?fields=${fields.join(',')}`, (response) => {
    if (!response || response.error) return reject(response && response.error || response);
    resolve(response);
  });
});

export const login = (scope?: string[]) => new Promise<{ email: string, name: string }>(async (resolve, reject) => {
  await FacebookAPI;
  FB.login((response) => {
    if (!response || response.error || (<any>response).status !== 'connected') return reject('Facebook login failed!');
    resolve(response.authResponse);
  }, { scope: scope ? scope.join(',') : undefined });
});

export const disconnect = () => new Promise(async (resolve, reject) => {
  await FacebookAPI;
  FB.api('/me/permissions', 'delete', (response) => {
    if (!response || response.error) return reject('Facebook disconnect failed!');
    resolve(response);
  });
});
