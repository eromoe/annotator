import React from 'react';
import {Link} from 'react-router';
import {
  Toolbar,
  ToolbarRow,
  ToolbarSection,
  ToolbarTitle,
  Icon,
} from 'react-mdc-web';


class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Toolbar>
        <ToolbarRow>
          <ToolbarSection align="left">
            <Icon name="arrow_back" />
          </ToolbarSection>
          <ToolbarSection>
            <ToolbarTitle>Corpus</ToolbarTitle>
          </ToolbarSection>
        </ToolbarRow>
      </Toolbar>

    );
  }
}

export default Header;
