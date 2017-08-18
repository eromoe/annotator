
import { fromJS } from 'immutable';
import corpusReducer from '../reducer';

describe('corpusReducer', () => {
  it('returns the initial state', () => {
    expect(corpusReducer(undefined, {})).toEqual(fromJS({}));
  });
});
