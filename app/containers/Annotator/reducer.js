import { Raw, Plain, Text, Document, State, Selection } from 'slate'
import { parcyToSlate } from './util/parcyToSlate'
import { defaultdata } from './defaultdata'


import { fromJS } from 'immutable';

import {
  CHANGE_URL,
} from './constants';


// const initialState = Raw.deserialize(defaultdata, { terse: true })

// The initial state of the App
const initialState = fromJS({
  documents: [],
  editor: Raw.deserialize(defaultdata, { terse: true }),
});


const applyTag = (node, tag, idx) => {
  node
    .addMark(tag.start, tag.len, {type: tag.type})
}

const sentenceToNode = ({ text, tags }) => {
  const node = Text.createFromString(text)
  tags.forEach(t => node.addMark(t.start, t.len, {type: t.type}))
  return node
}

const annotatorReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'EDITOR_STATE':
      return state.set('editor', action.editor)
    case 'MARK':
      return state.set('editor', state.get('editor').transform().toggleMark(action.mark).apply())
    case 'RECEIVE_ENTITIES':
      const nextState = parcyToSlate(action.paragraphs)
      return state.set('editor', Raw.deserialize(nextState, { terse: true }))
    default:
      return state
  }
}


export default annotatorReducer;
