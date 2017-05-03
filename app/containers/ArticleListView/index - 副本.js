import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import classNames from 'classnames/bind';

import { makeSelectCurrentUrl, makeSelectArticles } from 'containers/App/selectors';

import List from 'components/List';
import ListItem from 'components/ListItem';
import Wrapper from './Wrapper';

export class ArticleListView extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const item = this.props.item;

    // Put together the content of the repository
    const content = (
      <Wrapper>
        <a className={{ 'current': item.url === this.props.currentUrl }} href={item.url} target="_blank">
          {item.title}
        </a>
      </Wrapper>
    );

    // Render the content into a list item
    return (
      <div>
        <ListItem key={`repo-list-item-${item.url}`} item={content} />
      </div>
    );
  }
}

ArticleListView.propTypes = {
  articles: React.PropTypes.object,
  currentUrl: React.PropTypes.string,
};

export default connect(createStructuredSelector({
  articles: makeSelectArticles(),
  currentUrl: makeSelectCurrentUrl(),
}))(ArticleListView);