import React, { Fragment } from "react";
import { Menu, Header } from "semantic-ui-react";

function Navigation({ children }: { children: React.ReactNode }) {
  return (
    <Fragment>
      <Menu>
        <Menu.Item>
          <Header>Star Wars</Header>
        </Menu.Item>
      </Menu>
      {children}
    </Fragment>
  );
}

export default Navigation;
