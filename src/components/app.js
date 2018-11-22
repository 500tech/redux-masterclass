import * as React from 'react';
import { Provider } from 'hooks/redux.hooks';

import store from 'store';

import Home from 'components/home';

import './app.css';

class App extends React.Component<{}> {
  render() {
    return (
      <Provider store={store}>
        <Home />
      </Provider>
    );
  }
}

export default App;
