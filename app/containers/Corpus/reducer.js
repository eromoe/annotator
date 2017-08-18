/*
 *
 * Corpus reducer
 *
 */

import { fromJS } from 'immutable';
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

const initialState = fromJS({});

function corpusReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_CORPUS:
      return state.set("corpusId", action.corpusId);
    case REQUEST_DOCUMENTS:
      return state.set("corpusId", action.corpusId)
        .set('pageSize', action.pageSize)
        .set('pageNum', action.pageNum);
    case RECEIVE_CORPUS:
      return state.set("corpus", action.corpus);
    case REQUEST_DOCUMENTS:
      return state.setIn(["documents", action.corpus.id], action.documents);
    case SAVE_DOCUMENT:
      return state.set("corpus_name", action.corpus_name)
        .set('document', action.document);
    default:
      return state;
  }
}

export default corpusReducer;
