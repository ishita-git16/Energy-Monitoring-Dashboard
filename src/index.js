import 'react-app-polyfill/ie11'; // For IE 11 support
import 'react-app-polyfill/stable';
import 'core-js';
import './polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { icons } from './assets/icons'
import { Provider } from 'react-redux'
import { createStore } from 'redux';
import { SnackbarProvider } from 'notistack';
import authReducer from './Reducers/AuthReducer'
import store from './store';
// const store = createStore(
//   authReducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// )
React.icons = icons
ReactDOM.render(
  <Provider store={store}>
    <SnackbarProvider
      maxSnack={2}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      autoHideDuration={3000}
    >
      <App />
    </SnackbarProvider>
  </Provider>,
  document.getElementById('root')
);
