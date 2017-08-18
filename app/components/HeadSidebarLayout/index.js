import React from 'react';
import {Link} from 'react-router';
import {
  Toolbar,
  ToolbarRow,
  ToolbarSection,
  ToolbarTitle,
} from 'react-mdc-web';


class HeadSidebarLayout extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {

    let { header, sidebar  } = this.props;

    // sidebar.style = {
    //   "height": "inherit",
    //   "minHeight": "100%"
    // }

    return (

      <div>

        {/* {header} */}

        <div style={}>

          {/* <Drawer permanent style={{
            "height": "inherit",
            "minHeight": "100%"
          }}> */}

          {/* {sidebar} */}

          <div style={{
            "padding": "16px",
            "flex": "1"
          }}>

            {this.children}

          </div>

        </div>


      </div>


    );
  }
}


export default HeadSidebarLayout;
