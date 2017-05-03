/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectHome = (state) => state.get('home');

const makeSelectUrl = () => createSelector(
  selectHome,
  (homeState) => homeState.get('url')
);

export {
  selectHome,
  makeSelectUrl,
};
