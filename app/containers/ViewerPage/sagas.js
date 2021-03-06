/**
 * Gets the repositories of the user from Github
 */

import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { LOAD_INFO_BY_URL, LOAD_ARTICLES } from 'containers/App/constants';
import { infoLoaded, infoLoadingError, articlesLoaded, articlesLoadingError } from 'containers/App/actions';
import Config from 'config';
import request from 'utils/request';
import { makeSelectUrl } from 'containers/HomePage/selectors';


export function* getInfo() {
  const url = yield select(makeSelectUrl());
  console.log('url:', url);
  const requestURL = `${Config.api}/ent?url=${url}`;

  try {
    const info = yield call(request, requestURL);
    yield put(infoLoaded(info, url));
  } catch (err) {
    yield put(infoLoadingError(err));
  }
}

export function* getArticles() {
  const requestURL = `${Config.api}/articles`;

  try {
    const articles = yield call(request, requestURL);
    yield put(articlesLoaded(articles));
  } catch (err) {
    yield put(articlesLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* myData() {
  // Watches for LOAD_INFO_BY_URL actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution

  // const watcher = yield takeLatest(LOAD_INFO_BY_URL, getInfo);
  yield takeLatest(LOAD_INFO_BY_URL, getInfo);
  yield takeLatest(LOAD_ARTICLES, getArticles);

  // // Suspend execution until location changes
  // yield take(LOCATION_CHANGE);
  // yield cancel(watcher);

}

// Bootstrap sagas
export default [
  myData,
];
