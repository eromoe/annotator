/**
 * Gets the repositories of the user from Github
 */

import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import Config from 'config';
import request from 'utils/request';

import {
  makeSelectCorpus,
} from './selectors';

import {
  REQUEST_CORPUSES,
  REQUEST_CORPUSES_FAILED,
  RECEIVE_CORPUSES,
  REQUEST_DOCUMENTS,
  REQUEST_DOCUMENTS_FAILED,
  RECEIVE_DOCUMENTS,
  SAVE_DOCUMENT,
  SAVE_DOCUMENT_FAILED,
  NEXT_DOCUMENT,
  PREV_DOCUMENT,
  CHANGE_CORPUS,
  CHANGE_TAG,
  SHOW_DOCUMENTS_IN_CORPUS,
} from './constants';

export function* myData() {

}

// Bootstrap sagas
export default [
  myData,
];
