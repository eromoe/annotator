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

            <Link to={'/annotator'} selected><Icon name='insert_chart'/>Articles</Link>
            <Link to={'/'}><Icon name='library_books'/>Viewer</Link>
            <Link to={'#'}><Icon name='description'/>Viewer</Link>
            <Link to={'#'}><Icon name='art_track'/>Viewer</Link>
            <Link to={'#'}><Icon name='local_library'/>Viewer</Link>
            <Link to={'#'}><Icon name='developer_board'/>Viewer</Link>
            <Link to={'#'}><Icon name='local_offer'/>Viewer</Link>
            <Link to={'#'}><Icon name='local_library'/>Viewer</Link>


            <Link to={'#'}><Icon name='attachment'/>Marks</Link>
            <Link to={'#'}><Icon name='format_list_bulleted'/>Marks</Link>
          </Navigation>
          <DrawerSpacer>
            Test
          </DrawerSpacer>
          <Navigation>
            <Link to={'#'}><Icon name='featured_play_list'/>Viewer</Link>
            <Link to={'#'}><Icon name='format_list_bulleted'/>Crf</Link>
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
