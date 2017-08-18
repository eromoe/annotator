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
  REQUEST_CORPUS_FAILED,
  RECEIVE_CORPUS,
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


export function* requestDocuments(action) {
  const corpus = yield select(makeSelectCurrentCorpus());

  const requestURL = `${Config.api}/corpus/${corpus.id}/documents?ps=${corpus.page_size}&${corpus.page_num}`;

  try {
    const documents = yield call(request, requestURL);
    yield put({type: RECEIVE_DOCUMENTS, documents});
  } catch (err) {
    yield put({type: REQUEST_DOCUMENTS_FAILED, err});
  }
}

export function* requestCorpus(action) {
  const requestURL = `${Config.api}/corpus/${action.corpusId}`;

  try {
    const corpus = yield call(request, requestURL);
    yield put({type: RECEIVE_CORPUS, corpus});
  } catch (err) {
    yield put({type: REQUEST_CORPUS_FAILED, err});
  }
}


// Individual exports for testing
export function* defaultSaga() {
  yield takeLatest(REQUEST_DOCUMENTS, requestDocuments);
  yield takeLatest(REQUEST_CORPUS, requestCorpus);
}

// All sagas to be loaded
export default [
  defaultSaga,
];
