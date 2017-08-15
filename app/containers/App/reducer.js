/*
 * AppReducer
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
  LOAD_INFO_SUCCESS,
  LOAD_INFO_BY_URL,
  LOAD_INFO_ERROR,
  LOAD_ARTICLES,
  LOAD_ARTICLES_SUCCESS,
  RENDER_TAGGED_TEXT,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  currentUrl: false,
  articles: false,
  info: {
    text: NaN,
    tags: NaN,
    tags2: NaN,
  },
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ARTICLES:
      return state
        .set('loading', true)
        .set('error', false)
        .set('articles', false);
    case LOAD_ARTICLES_SUCCESS:
      return state
        .set('loading', false)
        .set('articles', action.articles);
    case RENDER_TAGGED_TEXT:
      return state
        .set('info', action.info)
        .set('currentUrl', action.info.url);
    case LOAD_INFO_BY_URL:
      return state
        .set('loading', true)
        .set('error', false)
        .set('info', false);
        // .setIn(['info', 'text'], 'empty')
        // .setIn(['info', 'tags'], [])
    case LOAD_INFO_SUCCESS:
      return state
        .set('info', action.info)
        .set('loading', false)
        .set('currentUrl', action.url);
    case LOAD_INFO_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}

export default appReducer;
