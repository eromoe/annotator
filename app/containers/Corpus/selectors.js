import { createSelector } from 'reselect';

/**
 * Direct selector to the corpus state domain
 */
const selectCorpusDomain = () => (state) => state.get('corpusPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Corpus
 */


export const makeSelectCorpus = () => createSelector(
  selectCorpusDomain(),
  (substate) => substate.toJS()
);

export const makeSelectCorpusList = () => createSelector(
  selectCorpusDomain(),
  (substate) => substate.get('corpuses')
);

export const makeSelectCurrentCorpus = () => createSelector(
  selectCorpusDomain(),
  (substate) => substate.get('corpuses')[substate.get('current_corpus_id')]
);


export const makeSelectDocumentPageSize = () => createSelector(
  selectCorpusDomain(),
  (substate) => substate.get('page_size')
);

export const makeSelectDocumentPageNum = () => createSelector(
  selectCorpusDomain(),
  (substate) => substate.get('page_num')
);

export const makeSelectDocuments = () => createSelector(
  selectCorpusDomain(),
  (substate) => substate.get('documents')
);


export default makeSelectCorpus;
