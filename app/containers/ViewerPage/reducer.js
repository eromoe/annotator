/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import { fromJS } from 'immutable';

import {
  CHANGE_URL,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  url: '',
  info: false,
});

function homeReducer(state = initialState, action) {
  console.log('anno homeReducer', state);
  switch (action.type) {
    case CHANGE_URL:
      return state
        .set('url', action.url);
    default:
      return state;
  }
}

export default homeReducer;
