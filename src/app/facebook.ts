/// <reference path="./facebook.d.ts" />
import { environment } from '../environments/environment';

let facebookAPIResolve: Function;
export const FacebookAPI = new Promise<any>((resolve) => facebookAPIResolve = resolve);

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
