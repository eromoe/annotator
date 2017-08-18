import React from 'react';
import {Link} from 'react-router';
import {
  Toolbar,
  ToolbarRow,
  ToolbarSection,
  ToolbarTitle,
} from 'react-mdc-web';


class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Toolbar>
        <ToolbarRow>
          <ToolbarSection>
            <ToolbarTitle>Textminer</ToolbarTitle>
          </ToolbarSection>
        </ToolbarRow>
      </Toolbar>

    );
  }
}

export default Header;
