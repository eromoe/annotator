import React from 'react'
import { connect } from 'react-redux'
import { Editor, Raw } from 'slate'
import { slateToParcy } from './util/slateToParcy'
import { REQUEST_TRAIN, REQUEST_ENTITIES } from './constants'
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardSubtitle,
  CardText,
  CardActions,
  FormField,
  Switch,
} from 'react-mdc-web'

const zip = (...rows) => [...rows[0]].map((_,c) => rows.map(row => row[c]))

const colors= [
  // 'materialize-red',
  'red',
  'pink',
  'purple',
  // 'deep-purple',
  'indigo',
  'blue',
  // 'light-blue',
  'cyan',
  'teal',
  'green',
  // 'light-green',
  'lime',
  'yellow',
  'amber',
  'orange',
  // 'deep-orange',
  'brown',
  'blue-grey',
  'grey',
]

const renderMark = (mark, color='red') => (props) => (
  <mark className={`${color} lighten-3  ${color}-text text-darken-4`} data-entity={mark}>
    {props.children}
    <span className={`entity-label ${color} ${color}-text text-lighten-4`}>{mark}</span>
  </mark>
)


const toParcy = (editor) => {
  return slateToParcy(Raw.serialize(editor).document)
}

const mapStateToProps = (state) =>{
  const annotator = state.get('annotator')
  const editor = annotator.get('editor')
  // const marks = annotator.get('marks')
  const tags = ['org',
    'person',
    'norp',
    'gpe',
    'loc',
    'date',
  ]

  let marks = {};

  for (const i of zip(tags, colors.slice(0, tags.length))){
    marks[i[0]] = renderMark(i[0], i[1]);
  }

  return {
    editorState: editor,
    raw: toParcy(editor),
    tags: tags,
    editmode:false,
    schema: {
      marks : marks
    }
  }
}


const mapDispatchToProps = (dispatch) => (
  {
    onChange: (editor) => dispatch(
      { type: 'EDITOR_STATE', editor: editor }
    ),
    onChangeEditMode: (checked) => dispatch(
      { type: 'MAKE_DOCUMENT_EDITABLE', editmode:checked}
    ),
    onMark: (type) => (e) => {
      // e.preventDefault()
      dispatch({type: 'MARK', mark: type})
    },
    onTrain: (raw) => (e) => {
      dispatch({ type: REQUEST_TRAIN, model: 'es', paragraphs: raw })
    },
    onDetect: (raw) => (e) => {
      dispatch({ type: REQUEST_ENTITIES, model: 'es', paragraphs: raw })
    }
  }
)

const TagButton = (k, color, v) => (
  <Button dense className={`${color} lighten-3  ${color}-text text-darken-4`}
    key={k} onClick={v}>{k.toUpperCase()}</Button>
)


const AnnotatorPane = ({editorState, schema, tags, editmode, onChangeEditMode, onChange, onMark, onTrain, onDetect, raw}) => (
  <div className="annotator">
    <h1>Annotator</h1>

    <Card style={{"marginBottom": "15px" }}>
      <CardActions>
        {
          zip(tags, colors.slice(0, tags.length)).map((i) => TagButton(i[0], i[1], onMark(i[0])) )
        }



        <FormField id="editmode">
          <Switch
            checked={editmode}
            onChange={(o)=> onChangeEditMode(o)}
          />
          <label>编辑模式</label>
        </FormField>
      </CardActions>
    </Card>

{/*
    <div className="btn-group btn-group-sm" style={{"margin-bottom": "15px" }} >
      {
        zip(tags, colors.slice(0, tags.length)).map((i) => TagButton(i[0], i[1], onMark(i[0])) )
      }
    </div> */}
    <div className="panel panel-default">
      <div className="panel-body">
        <Editor state={editorState} schema={schema} onChange={onChange}/>
      </div>
    </div>
    <a className="btn btn-primary" onClick={onDetect(raw)}>Detect</a>
    <a className="btn btn-default" onClick={onTrain(raw)}>Train</a>
  </div>
)

const Annotator = connect(mapStateToProps, mapDispatchToProps)(AnnotatorPane)

export default Annotator;
