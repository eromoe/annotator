import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { infoLoaded, infoLoadingError, articlesLoaded, articlesLoadingError } from 'containers/App/actions';
import Config from 'config';
import request from 'utils/request';

import {
  makeSelectCorpus,
  makeSelectCurrentCorpus,
} from './selectors';

import {
  REQUEST_CORPUS,
} from './constants';


// Individual exports for testing
export function* defaultSaga() {

}

// All sagas to be loaded
export default [
  defaultSaga,
];
