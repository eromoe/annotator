import React, { PropTypes } from 'react';
import LoadingIndicator from 'components/LoadingIndicator';
import Colors from 'utils/color';

import Wrapper from './Wrapper';
import Mark from './Mark';

function makeColor(colorNum, colors) {
  if (colors < 1) colors = 1; // defaults to one color - avoid divide by zero
  return (colorNum * (360 / colors)) % 360;
}

function TaggedText({ loading, error, info }) {
  console.log('error:', error);
  console.log('info:', info);
  if (loading) {
    return <Wrapper component={LoadingIndicator} />;
  }

  let showTags = [];
  let content = '';
  let lastIdx = 0;
  let items = [];
  let trs = [];


  if (error !== false) {
    // error is object , would cause `Invariant Violation: Objects are not valid as a React child`
    // so use eroor.toString()
    return (<Wrapper>{error.toString()}</Wrapper>);
  }

  // If we have items, render them
  if (info.text && info.tags) {
    for (const [index, item] of info.tags.entries()) {
      console.log('item:', item);
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
        items.push(info.text.slice(lastIdx, offset[0]));
        items.push(<span className={tag} style={{ 'backgroundColor': Colors[showTags.indexOf(tag)] }}>{info.text.slice(offset[0], offset[1])}</span>);
        // content += info.text.slice(lastIdx, offset[0]);
        // content += <Mark className={tag}>{info.text.slice(offset[0], offset[1])}</Mark>;
        lastIdx = offset[1];
      } else {
        if (offset[1] > lastIdx) {
          items.push(<span className={tag} style={{ 'backgroundColor': Colors[showTags.indexOf(tag)] }}>{info.text.slice(lastIdx, offset[1])}</span>);
          lastIdx = offset[1];
        } else {
          const a = 1;
        }
      }

      
    }

    items.push(info.text.slice(lastIdx, ));
    // content += info.text.slice(lastIdx, );

    // showTags.length
    // create css to each tag with different hightlight color.

  } else {
    content = 'empty';
  }

  console.log(items);

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
  info: PropTypes.any,
};


export default TaggedText;
