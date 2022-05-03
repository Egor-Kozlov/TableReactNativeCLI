import React from 'react';
import {Provider} from 'react-redux';
import Router from './Router/Router.js';
import Welcome from './screens/Welcome/Welcome.js';

import {store} from './store/store.js';

function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}

export default App;
