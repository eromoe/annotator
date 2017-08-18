
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import NavLink from 'components/NavLink'
import { makeSelectCorpusList } from './selectors';
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
  GridList,
  Tile,
  Drawer,
  DrawerSpacer,
  Navigation,
} from 'react-mdc-web';

import {
  REQUEST_CORPUSES,
} from './constants'

import Header from './header'

import CorpusTable from './tables'

function corpusLink(corpusId) {
  return `/corpus/${corpusId}`;
}

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {
    // const {corpusList } = this.props;
    const corpusList = [
      {
        id:1,
        name:'111',
        desc:'2222',
      },
    ];

    return (

      <div>

        <Header />

        <div style={{
          "display": "flex",
          "boxSizing": "border-box",
          "flex": 1
        }}>

          <Helmet
            title="Corpus"
            meta={[
              { name: 'Corpus manager', content: 'Corpus manager' },
            ]}
          />

          <Drawer permanent style={{
            "height": "inherit",
            "minHeight": "100%"
          }}>
            <DrawerSpacer>
              Corpus
            </DrawerSpacer>
            <Navigation className="navigation">
              <NavLink to={'/'} selected><Icon name='insert_chart'/>Corpus</NavLink>
              <NavLink to={'/annotator'}><Icon name='library_books'/>Articles</NavLink>
              <NavLink to={'/annotator'}><Icon name='description'/>Annotator</NavLink>
              {/* <NavLink to={'#'}><Icon name='art_track'/>Viewer</NavLink>
              <NavLink to={'#'}><Icon name='local_library'/>Viewer</NavLink>
              <NavLink to={'#'}><Icon name='developer_board'/>Viewer</NavLink>
              <NavLink to={'#'}><Icon name='local_offer'/>Viewer</NavLink>
              <NavLink to={'#'}><Icon name='local_library'/>Viewer</NavLink>
              <NavLink to={'#'}><Icon name='attachment'/>Marks</NavLink>
              <NavLink to={'#'}><Icon name='format_list_bulleted'/>Marks</NavLink> */}
            </Navigation>
            <DrawerSpacer>
              Test
            </DrawerSpacer>
            <Navigation>
              <NavLink to={'#test'}><Icon name='featured_play_list'/>Viewer</NavLink>
              <NavLink to={'#crf'}><Icon name='format_list_bulleted'/>Crf</NavLink>
            </Navigation>
          </Drawer>

          <div style={{
            "padding": "16px",
            "flex": "1"
          }}>
            <ToolbarRow>
              <ToolbarSection align="start">
                <Textfield
                  placeholder="搜索"
                  onChange={({target : {value : keyword}}) => {
                    this.setState({ keyword })
                  }}
                />
              </ToolbarSection>
              <ToolbarSection align="end">
                <Button raised primary>搜索</Button>
              </ToolbarSection>
            </ToolbarRow>

            <CorpusTable corpusList={corpusList} />

          </div>

        </div>

      </div>
    );
  }
}

HomePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  corpusList: makeSelectCorpusList(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    requestCorpusList: (pageSize, pageNum) =>
    { type:REQUEST_CORPUSES, pageSize, pageNum },
  };
}

const ConnectedHomePage = connect(mapStateToProps, mapDispatchToProps)(HomePage);

ConnectedHomePage.defaultProps = {
  corpusList: [],
  pageNum:1,
  pageSize:10,
}


export default ConnectedHomePage
