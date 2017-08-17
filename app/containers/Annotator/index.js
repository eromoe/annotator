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
  Grid,
  Cell,
  ToolbarRow,
  ToolbarSection,
  ToolbarTitle,
  Display1,
  Fab,
  Icon,
  IconToggle,
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
  List,
  ListItem,
  ListDivider,
  Textfield,
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
    editmode:state.get('editmode'),
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
      { type: 'SWITCH_DOCUMENT_EDITMODE', editmode:checked}
    ),
    onOpenTagsDialog: (e) => dispatch(
      { type: 'SWITCH_DOCUMENT_EDITMODE', editmode:checked}
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


export class AnnotatorPane extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };

  }

  setState(data){
    this.state = {...this.state, ...data};
    this.forceUpdate();
  }

  render(){

    const {editorState,
      schema,
      tags,
      editmode,
      onChangeEditMode,
      onChange,
      onMark,
      onTrain,
      onDetect,
      raw} = this.props;

    const tagColormap = zip(tags, colors.slice(0, tags.length));

    return (
      <div className="annotator">
        <Display1>Annotator</Display1>

        <ToolbarRow>
          <ToolbarSection align="start">
            {
              tagColormap.map((i) => TagButton(i[0], i[1], onMark(i[0])) )
            }
            <Icon name='create' className="edit-tags-btn"
              onClick={()=> { this.setState({isOpen: true}) } } />

          </ToolbarSection>
          <ToolbarSection align="end">
            <FormField id="editmode" className="right">
              <Switch
                checked={editmode}
                onChange={({target: {checked}})=> onChangeEditMode(checked)}
              />
              <label>编辑模式</label>
            </FormField>
          </ToolbarSection>
        </ToolbarRow>

        <Card className="panel panel-default">
          <div className="panel-body">
            <Editor state={editorState} schema={schema} onChange={onChange}/>
          </div>
        </Card>

        <ToolbarRow>
          <ToolbarSection align="start">
            <Button raised primary className="btn btn-primary" onClick={onDetect(raw)}>Prev</Button>
          </ToolbarSection>
          <ToolbarSection align="end">
            <Button raised primary className="btn btn-default" onClick={onTrain(raw)}>Next</Button>
          </ToolbarSection>
        </ToolbarRow>

        <Dialog
          open={this.state.isOpen}
          onClose={() => {this.setState({isOpen:false})}}
          className="dialog"
        >
          <DialogHeader>
            <DialogTitle>编辑TAGS</DialogTitle>
          </DialogHeader>
          <DialogBody scrollable className="dialog-body">
            <List>
              {
                tagColormap.map((i) =>
                  (
                    <ListItem key={i[0]} className="tag-edit-line">
                      <Grid>
                        <Cell col={3}>
                          <Textfield
                            floatingLabel="TAG"
                            value={i[0]}
                            onChange={({target : {value : city}}) => {
                              this.setState({ city })
                            }}
                          />
                        </Cell>
                        <Cell col={3}>
                          <Textfield
                            floatingLabel="色值"
                            value={i[1]}
                            onChange={({target : {value : city}}) => {
                              this.setState({ city })
                            }}
                          />
                        </Cell>
                        <Cell col={3}>
                          <Textfield
                            floatingLabel="快捷键"
                            value={this.state.city}
                            onChange={({target : {value : city}}) => {
                              this.setState({ city })
                            }}
                          />
                        </Cell>
                        <Cell col={3}>
                          <Textfield
                            floatingLabel="备注"
                            value={this.state.city}
                            onChange={({target : {value : city}}) => {
                              this.setState({ city })
                            }}
                          />
                        </Cell>
                      </Grid>
                    </ListItem>
                  )
                )

              }
            </List>
          </DialogBody>
          <DialogFooter className="align-axis">
            <Button raised className="blue white-text left" >新增</Button>
            <Button raised className="cyan white-text" onClick={()=> { this.setState({isOpen: false}) }}>取消</Button>
            <Button raised primary onClick={()=> { this.setState({isOpen: false}) }} >提交</Button>
          </DialogFooter>
        </Dialog>

      </div>
    );
  }
}


const Annotator = connect(mapStateToProps, mapDispatchToProps)(AnnotatorPane)

export default Annotator;
