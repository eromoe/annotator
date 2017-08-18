/*
 *
 * Corpus
 *
 */

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { makeSelectDocuments } from './selectors';
import { REQUEST_DOCUMENTS } from './constants';
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
  Drawer,
  Navigation,
} from 'react-mdc-web'

import NavLink from 'components/NavLink'
import Header from './header'


const SiderBar = ({corpusId}) => (
  <Drawer permanent >
    <Navigation className="navigation">
      <NavLink to={`/corpus/${corpusId}/`} selected><Icon name='insert_chart'/>Documents</NavLink>
      <NavLink to={`/corpus/${corpusId}/tags`}><Icon name='library_books'/>Tags</NavLink>
      <NavLink to={`/corpus/${corpusId}/annotator`}><Icon name='description'/>Annotator</NavLink>
    </Navigation>
  </Drawer>
);

export class Corpus extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentDidMount(){

  }

  render() {
    const {documents, corpus } = this.props;
    const corpusId = this.props.params.corpusId;

    return (
      <div>
        <Helmet
          title="Corpus"
          meta={[
            { name: 'Corpus manager', content: 'Corpus manager' },
          ]}
        />

        <Header/>

        <div className="layout">

          <Drawer permanent className="sidebar-left">
            <Navigation className="navigation">
              <NavLink to={`/corpus/${corpusId}/`} selected><Icon name='insert_chart'/>Documents</NavLink>
              <NavLink to={`/corpus/${corpusId}/tags`}><Icon name='library_books'/>Tags</NavLink>
              <NavLink to={`/corpus/${corpusId}/annotator`}><Icon name='description'/>Annotator</NavLink>
            </Navigation>
          </Drawer>

          <div className="content">

            <div className="document-table table">
              <Grid className="table-header">
                <Cell col={3}>title</Cell>
                <Cell col={7}>text</Cell>
                <Cell col={2}>action</Cell>
              </Grid>
              {
                documents && documents.map((c) =>
                  (
                    <Grid key={c.id} className="table-row">
                      <Cell col={3}>{c.title}</Cell>
                      <Cell col={7}>{c.text}</Cell>
                      <Cell col={2}> <Link to={corpusLink(c.id)} ><Icon name="keyboard_arrow_right"></Icon></Link> </Cell>
                    </Grid>
                  )
                )
              }
            </div>

          </div>

        </div>

      </div>
    );
  }
}

// Corpus.propTypes = {
//   dispatch: PropTypes.func.isRequired,
// };

const mapStateToProps = createStructuredSelector({
  documents: makeSelectDocuments(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    requestDocuments: (corpusId,pageSize, pageNum) =>
    { type:REQUEST_DOCUMENTS, corpusId , pageSize, pageNum },
  };
}

const CorpusPage = connect(mapStateToProps, mapDispatchToProps)(Corpus);

CorpusPage.defaultProps = {
  documents: [],
  tags: [],
  pageNum:1,
  pageSize:10,
}

export default CorpusPage;
