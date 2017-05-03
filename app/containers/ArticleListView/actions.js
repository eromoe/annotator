/*
 * Home Actions
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
  SELECT_ITEM,
  RENDER_TAGGED_TEXT,
} from './constants';

/**
 * Changes the input field of the form
 *
 * @param  {url} url The new text of the input field
 *
 * @return {object}    An action object with a type of CHANGE_URL
 */
export function selectItem(url) {
  return {
    type: SELECT_ITEM,
    url,
  };
}

export function renderTaggedText(info) {
  return {
    type: RENDER_TAGGED_TEXT,
    info,
  };
}

