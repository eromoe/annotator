/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectInfo, makeSelectLoading, makeSelectError, makeSelectArticles } from 'containers/App/selectors';
import H2 from 'components/H2';
import Config from 'config';
import TaggedText from 'components/TaggedText';
import AtPrefix from './AtPrefix';
import CenteredSection from './CenteredSection';
import Form from './Form';
import Input from './Input';
import Section from './Section';
import messages from './messages';
import { loadUrl, infoLoaded, loadArticles, renderTaggedText } from '../App/actions';
import { changeUrl } from './actions';
import { makeSelectUrl } from './selectors';

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state url is not null, submit the form to load repos
   */
  componentDidMount() {

    if (this.props.url && this.props.url.trim().length > 0) {
      this.props.onSubmitForm();
    }

    this.props.onLoadArticles();

  }

  onChangeFocusItem() {

  }

  render() {
    const { loading, error, info, articles } = this.props;
    const {text, tags, tags2 } = info;
    const urlInfoProps = {
      loading,
      error,
      text,
      tags,
    };

    const urlInfoProps2 = {
      loading,
      error,
      text,
      tags: tags2,
    };

    console.log('home articles:', articles);
    console.log('home info:', info);
    

    return (

      <div className="main">
        <div className="left-view">
          <div className="article-list-view">

            { articles && articles.map((article)=> 
              <div className="article-list-item" onClick={() => this.props.onRenderArticleInfo(article)}>
                <h5 className="article-title">{article.title}</h5>
                <p className="article-url" >{article.url}</p>
              </div> 
            )}
          </div>
        </div>
        <div className="main-view">
          <article className="entity-viewer">
            <Helmet
              title="Home Page"
              meta={[
                { name: 'description', content: 'annotator viewer' },
              ]}
            />
            <div>
              <CenteredSection>
                <H2>
                  Entity Viewer
                </H2>
              </CenteredSection>
              <Section>
                <Form className="view-form" onSubmit={this.props.onSubmitForm}>
                  <label htmlFor="UrlInput">
                    <Input
                      id="UrlInput"
                      className="url-input"
                      type="text"
                      placeholder=""
                      value={this.props.info.url}
                      onChange={this.props.onChangeUrl}
                    />
                  </label>
                  <button className="waves-effect waves-light url-submit btn"  type="submit">提交</button>
                </Form>
                <div>
                  <h3>基础实体</h3>
                  <TaggedText {...urlInfoProps} />
                </div>
                <hr />
                <div>
                  <h3>筛选后的概念实体</h3>
                  <TaggedText {...urlInfoProps2} />
                </div>
              </Section>
            </div>
          </article>
        </div>
      </div>

    );
  }
}

HomePage.propTypes = {
  loading: React.PropTypes.bool,
  error: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  info: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  articles: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.bool,
  ]),
  onSubmitForm: React.PropTypes.func,
  // url: React.PropTypes.string,
  onChangeUrl: React.PropTypes.func,
  onRenderArticleInfo: React.PropTypes.func,
  onLoadArticles: React.PropTypes.func,
};

    // console.log('RootNode openNode')
    // const {info, actions} = this.props
    // console.log('RootNode', info)
    // console.log('RootNode actions', actions)
    // actions.openNode(info.path)


export function mapDispatchToProps(dispatch) {
  return {
    onLoadArticles: () => dispatch(loadArticles()),
    onChangeUrl: (evt) => dispatch(changeUrl(evt.target.value)),
    onRenderArticleInfo: (article) => {
      // home's action, so here, article map to info is in home's scope, so App.selectors.makeSelectInfo can not get it
      dispatch(renderTaggedText(article));
      console.log(article.url);
      dispatch(changeUrl(article.url));
      // dispatch(loadUrl());
    },
    onSubmitForm: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadUrl());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  info: makeSelectInfo(),
  url: makeSelectUrl(),
  articles: makeSelectArticles(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);