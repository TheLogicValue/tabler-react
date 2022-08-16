// @flow

import * as React from "react";
import Tab from "./Tab.react";
import Nav from "../Nav/Nav.react";
import Card from "../Card/index";
import cn from "classnames";

type Props = {|
  +children: React.ChildrenArray<React.Element<typeof Tab>>,
  +selectedTitle: string,
  +options: React.Node,
  +stateCallback: (selectedTitle: string) => void,
|};

function TabbedHeader(props: Props): React.Node {
  const { children, stateCallback, options } = props;
  const classes = cn("tab-header", className);
  const tabs = React.Children.toArray(children);
  return (
    <Card.Header className={classes}>
      <ul className="nav nav-tabs Tab_header_tabs">
        {tabs.map((tab, index) => {
          const title = tab.props.title;
          return (
            <Nav.Item
              key={index}
              value={title}
              onClick={() => stateCallback(title)}
              active={title === props.selectedTitle}
            />
          );
        })}
      </ul>
      <Card.Options>
          {options}
      </Card.Options>
    </Card.Header>
  );
}

export default TabbedHeader;
