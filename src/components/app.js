import * as React from 'react';
import { Provider } from 'react-redux';

import store from 'store';
import theme from 'constants/themes.constants';

import Localization from 'components/localization'; // TODO: remove if no localization
import Layout from 'components/layout/layout';
import Home from 'components/home';

import './app.css';

class App extends React.Component<{}> {
  render() {
    return (
      <Provider store={store}>
        <Localization>
          <Home />
        </Localization>
      </Provider>
    );
  }
}

export default App;
