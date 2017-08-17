/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import NavLink from 'components/NavLink'
import Header from 'components/Header';
import Footer from 'components/Footer';
import withProgressBar from 'components/ProgressBar';

// import 'styles/main.css';

import {
  Card,
  CardHeader,
  CardTitle,
  Drawer,
  DrawerSpacer,
  Navigation,
  Icon,
} from 'react-mdc-web';

import 'styles/main.scss';
// import 'material-components-web/dist/material-components-web.min.css';


// const AppWrapper = styled.div`
//   max-width: calc(1468px + 16px * 2);
//   margin: 0 auto;
//   display: flex;
//   min-height: 100%;
//   padding: 0 16px;
//   flex-direction: column;
// `;

export function App(props) {

  console.log('props.location.pathname', props.location.pathname);

  return (
    <div id="app">
      <Helmet
        titleTemplate="%s - test"
        defaultTitle="Annotator Viewer"
        meta={[
          { name: 'description', content: 'Annotator Viewer' },
        ]}
      />

      <Header />

      <div style={{
        "display": "flex",
        "boxSizing": "border-box",
        "flex": 1
      }}>


        <Drawer permanent style={{
          "height": "inherit",
          "minHeight": "100%"
        }}>
          <DrawerSpacer>
            Corpus
          </DrawerSpacer>
          <Navigation>

            <NavLink to={'/annotator'}><Icon name='insert_chart'/>Articles</NavLink>
            <NavLink to={'/'}><Icon name='library_books'/>Viewer</NavLink>
            <NavLink to={'/annotator'}><Icon name='description'/>Annotator</NavLink>
            <NavLink to={'#'}><Icon name='art_track'/>Viewer</NavLink>
            <NavLink to={'#'}><Icon name='local_library'/>Viewer</NavLink>
            <NavLink to={'#'}><Icon name='developer_board'/>Viewer</NavLink>
            <NavLink to={'#'}><Icon name='local_offer'/>Viewer</NavLink>
            <NavLink to={'#'}><Icon name='local_library'/>Viewer</NavLink>

            <NavLink to={'#'}><Icon name='attachment'/>Marks</NavLink>
            <NavLink to={'#'}><Icon name='format_list_bulleted'/>Marks</NavLink>
          </Navigation>
          <DrawerSpacer>
            Test
          </DrawerSpacer>
          <Navigation>
            <NavLink to={'#'}><Icon name='featured_play_list'/>Viewer</NavLink>
            <NavLink to={'#'}><Icon name='format_list_bulleted'/>Crf</NavLink>
          </Navigation>
        </Drawer>

        <div style={{
          "padding": "16px",
          "flex": "1"
        }}>
          {React.Children.toArray(props.children)}
        </div>

      </div>

      {/*<Footer />*/}

    </div>
  );
}

App.propTypes = {
  children: React.PropTypes.node,
};

export default withProgressBar(App);
