import React from 'react';
import ReactDOM from 'react-dom';

import Mimic from 'mimic';

import 'index.scss';

import App from 'components/app';

if (process.env.NODE_ENV === 'development') {
  require('components/debug/debug-menu');
}

ReactDOM.render(<App />, document.getElementById('root'));
