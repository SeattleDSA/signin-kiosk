import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';

import reducers from './reducers';

import { HashRouter } from 'react-router-dom';

import Settings from './containers/settings';
import Signin from './containers/signin';

import SideMenu from './containers/side-menu';

import configureStore, { history } from './store';

const store = configureStore(/* initial state */);

const appDiv = document.createElement("DIV");
appDiv.id = "app";

document.body.appendChild(appDiv);

ReactDOM.render(
  (
    <Provider store={store}>
      <SideMenu />
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path="/settings" component={Settings} />
          <Route exact path="/signin" component={Signin} />
        </Switch>
      </ConnectedRouter>
    </Provider>
  )
  , document.getElementById('app'));
