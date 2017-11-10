/// <reference path="../node_modules/@types/googlemaps/index.d.ts" />
/// <reference path="../node_modules/@types/mithril/index.d.ts" />
/// <reference path="../node_modules/compote/components/index.d.ts" />

import { Hyperscript, Vnode, Component, Children, Lifecycle } from 'mithril';

declare global {
  const process: {
    env: Record<string, any>;
  };

  interface Action<ActionType> {
    type?: ActionType;
  }

  const m: Hyperscript;

  // https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react/index.d.ts
  namespace JSX {
    type Element = any;

    type IntrinsicElements = {
      [key: string]: any
    };
  }
}
