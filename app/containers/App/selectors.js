/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = (state) => state.get('global');

const makeSelectCurrentUrl = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('currentUrl')
);

const makeSelectLoading = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('loading')
);

const makeSelectError = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('error')
);

const makeSelectInfo = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('info')
);

const makeSelectArticles = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('articles')
);

const makeSelectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

export {
  selectGlobal,
  makeSelectArticles,
  makeSelectCurrentUrl,
  makeSelectLoading,
  makeSelectError,
  makeSelectInfo,
  makeSelectLocationState,
};
