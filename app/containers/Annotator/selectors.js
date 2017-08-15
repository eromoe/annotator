
import { createSelector } from 'reselect';

const selectAnnotator = (state) => state.get('annotator');

const makeSelecDocuments = () => createSelector(
  selectAnnotator,
  (state) => state.get('documents')
);

const makeSelectEditorState = () => createSelector(
  selectAnnotator,
  (state) => state.get('editorState')
);


export {
  selectAnnotator,
  makeSelectEditorState,
  makeSelecDocuments,
};
