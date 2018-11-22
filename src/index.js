import React from 'react';
import ReactDOM from 'react-dom';
import { get, values } from 'lodash/fp';

import Mimic from 'mimic';

import 'index.scss';

import App from 'components/app';
// import registerServiceWorker from './register-service-worker';

// TODO: change to app name
// Mimic.setAppName('MyApp');

if (process.env.NODE_ENV === 'development') {
  require('components/debug/debug-menu');
}

ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();

const handler = {
  get(target, key) {
    const value = target.raw[key];

    if (typeof value === 'object') {
      return new Proxy({ raw: value }, handler);
    } else {
      return value;
    }
  },
  has(target, key) {
    return key in target.raw;
  },
  ownKeys(target) {
    return Reflect.ownKeys(target.raw);
  },
  getOwnPropertyDescriptor(target, prop) {
    debugger;
    return Object.getOwnPropertyDescriptor(target.raw);
  }
};

const state = {
  products: {
    1: { title: 'moshe' }
  }
};
const proxied = new Proxy({ raw: state }, handler);

console.dir(Object.keys(proxied.products));
