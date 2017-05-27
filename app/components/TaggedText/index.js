import React, { PropTypes } from 'react';
import LoadingIndicator from 'components/LoadingIndicator';
import Colors from 'utils/color';

import Wrapper from './Wrapper';
import Mark from './Mark';

function makeColor(colorNum, colors) {
  if (colors < 1) colors = 1; // defaults to one color - avoid divide by zero
  return (colorNum * (360 / colors)) % 360;
}

function TaggedText({ loading, error, text, tags }) {
  console.log('error:', error);
  // console.log('text:', text);
  // console.log('tags:', tags);

  if (loading) {
    return <Wrapper component={LoadingIndicator} />;
  }

  let showTags = [];
  let content = '';
  let lastIdx = 0;
  let items = [];
  let trs = [];

  // if (text)
  //   text.replace('\n', '\\n');

  if (error !== false) {
    // error is object , would cause `Invariant Violation: Objects are not valid as a React child`
    // so use eroor.toString()
    return (<Wrapper>{error.toString()}</Wrapper>);
  }

  // If we have items, render them
  if (text && tags) {
    for (const [index, item] of tags.entries()) {
      // console.log('item:', item);
      const tag = item[0];
      const value = item[1];
      const offset = item[2];
      if (showTags.indexOf(tag) === -1) {
        showTags.push(tag);
      }

      trs.push(
      <tr>
        <td className="name">{tag}</td>
        <td className="entity">{value}</td>
        <td className="offset">({offset[0]}, {offset[1]})</td>
      </tr>
      );

      if (offset[0] > lastIdx) {
        items.push(text.slice(lastIdx, offset[0]));
        items.push(<span className={tag} style={{ 'backgroundColor': Colors[showTags.indexOf(tag)] }}>{text.slice(offset[0], offset[1])}</span>);
        // content += info.text.slice(lastIdx, offset[0]);
        // content += <Mark className={tag}>{info.text.slice(offset[0], offset[1])}</Mark>;
        lastIdx = offset[1];
      } else {
        if (offset[1] > lastIdx) {
          items.push(<span className={tag} style={{ 'backgroundColor': Colors[showTags.indexOf(tag)] }}>{text.slice(lastIdx, offset[1])}</span>);
          lastIdx = offset[1];
        } else {
          const a = 1;
        }
      }
      
    }

    items.push(text.slice(lastIdx, ));

    // content += info.text.slice(lastIdx, );

    // showTags.length
    // create css to each tag with different hightlight color.

  } else {
    content = 'empty';
  }


  return (
    <div>
      <div className="showTags">
        {showTags.map((tag)=> <span className='tag' style={{ 'backgroundColor': Colors[showTags.indexOf(tag)] }}>{tag}</span> )}
      </div>
      <Wrapper>
        {items}
      </Wrapper>

      <table className="entity-table table">
        <tbody>
          <tr>
            <th>name</th>
            <th>entity</th>
            <th>offset</th>
          </tr>
          {trs}
        </tbody>
      </table>


    </div>
  );
}


TaggedText.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  text: PropTypes.string,
  tags: PropTypes.array,
};


export default TaggedText;
