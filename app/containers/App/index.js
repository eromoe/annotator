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
// import Header from 'components/Header';
import Footer from 'components/Footer';
import withProgressBar from 'components/ProgressBar';


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


export function App(props) {

  console.log('props.location.pathname', props.location.pathname);

  return (
    <div id="app">
      <Helmet
        titleTemplate="Textminer - %s"
        defaultTitle="Annotator"
        meta={[
          { name: 'description', content: 'Annotator' },
        ]}
      />

      {React.Children.toArray(props.children)}

      {/*<Footer />*/}

    </div>
  );
}

App.propTypes = {
  children: React.PropTypes.node,
};

export default withProgressBar(App);
