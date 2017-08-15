/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  LOAD_INFO_BY_URL,
  LOAD_INFO_SUCCESS,
  LOAD_INFO_ERROR,
  LOAD_ARTICLES,
  LOAD_ARTICLES_SUCCESS,
  LOAD_ARTICLES_ERROR,
  RENDER_TAGGED_TEXT,
} from './constants';

/**
 * Load the url info, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_INFO_BY_URL
 */
export function loadInfoByUrl() {
  return {
    type: LOAD_INFO_BY_URL,
  };
}

/**
 * Dispatched when the url info are loaded by the request saga
 *
 * @param  {array} info The info data
 * @param  {string} url The current url
 *
 * @return {object}      An action object with a type of LOAD_INFO_SUCCESS passing the info
 */
export function infoLoaded(info, url) {
  return {
    type: LOAD_INFO_SUCCESS,
    info,
    url,
  };
}

/**
 * Dispatched when loading the url info fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_INFO_ERROR passing the error
 */
export function infoLoadingError(error) {
  return {
    type: LOAD_INFO_ERROR,
    error,
  };
}


export function loadArticles() {
  return {
    type: LOAD_ARTICLES,
  };
}

export function articlesLoaded(articles) {
  return {
    type: LOAD_ARTICLES_SUCCESS,
    articles,
  };
}

export function articlesLoadingError(error) {
  return {
    type: LOAD_ARTICLES_ERROR,
    error,
  };
}

export function renderTaggedText(info) {
  return {
    type: RENDER_TAGGED_TEXT,
    info,
  };
}

