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

    window.onload_sss = function(){

      $(document).on('click', '.article-list-item',  function(e){
        if ($(this).hasClass('selected')) {
          $(this).removeClass('selected');
        } else {
          $(this).parent().find('.selected').removeClass('selected');
          $(this).addClass('selected');
          // console.log(111, $(this));
          $('.url-input').val($(this).attr('url'));
          var event = new Event('input', { bubbles: true });
          $('.url-input')[0].dispatchEvent(event);
          $('.url-submit').click();
          // dispatch(infoLoaded($(this).data('info'), $(this).attr('url')));
        }

      });

      $.ajax({
        url: Config.api + '/articles',
        success:function(ret){
          
          var item = $('<div class="article-list-item"><h5 class="article-title"></h5><p class="article-url"></p></div>');
          var root = $('.article-list-view');

          // var tr = $('<tr class="table-item"><td class="name"></td><td class="entity"></td></tr>');
          // var table = $('<div class="article-list-item"><h5 class="article-title"></h5><p class="article-url"></p></div>');

          console.log('ret', ret);
          // root.empty();
          for (var i=0; i<ret.length; i++) {
            var a = item.clone();
            a.find('.article-title').text(ret[i]['title']);
            a.find('.article-url').text(ret[i]['url']);
            a.attr('url', ret[i]['url']);
            a.data('info',  {'text':ret[i]['text'], 'tags':ret[i]['tags']});
            root.append(a);
          }
        },
        error:function(e){
          alert(e);
        }
      });
    };

  }

  onChangeFocusItem() {

  }

  render() {
    const { loading, error, info, articles } = this.props;
    const urlInfoProps = {
      loading,
      error,
      info,
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
                <TaggedText {...urlInfoProps} />
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
      // console.log(article.url);
      // dispatch(changeUrl(article.url));
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

