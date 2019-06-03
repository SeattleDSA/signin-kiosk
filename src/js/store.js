import { createHashHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import sideEffectMiddleware from './middleware/side-effect';
import createRootReducer from './reducers';

export const history = createHashHistory();

import {
  ALL_MEMBERS_KEY,
  FILTER_KEY,
  CHECKINS_KEY
} from './actions/members';

function loadMembersFromStorage() {
  return JSON.parse(window.localStorage.getItem(ALL_MEMBERS_KEY) || "[]");
}

function loadFilterFromStorage() {
  return window.localStorage.getItem(FILTER_KEY) || "All";
}

function loadCheckinsFromStorage() {
  return JSON.parse(window.localStorage.getItem(CHECKINS_KEY) || "{}");
}

const initialState = {
  members: {
    allMembers: loadMembersFromStorage(),
    filter: loadFilterFromStorage(),
    checkins: loadCheckinsFromStorage()
  },
  csv: {}
};

export default function configureStore(preloadedState = initialState) {
  const store = createStore(
    createRootReducer(history, preloadedState), // root reducer with router state
    compose(
      applyMiddleware(
        routerMiddleware(history),
        sideEffectMiddleware
      ),
    ),
  )

  return store;
}
