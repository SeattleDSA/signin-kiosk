import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'

import createMemberReducer from './members';
import createCsvReducer from './csv';

export default function createRootReducer(history, initialState = {}) {
  return combineReducers({
    router: connectRouter(history),
    members: createMemberReducer(initialState.members),
    csv: createCsvReducer(initialState.csv)
  });
};
