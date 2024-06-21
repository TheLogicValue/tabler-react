// @flow

import * as React from "react";
import Tab from "./Tab.react";
import Nav from "../Nav/Nav.react";
import Card from "../Card/index";
import cn from "classnames";

type Props = {|
  +children: React.ChildrenArray<React.Element<typeof Tab>>,
  +selectedTab: number,
  +options: React.Node,
  +stateCallback: (selectedTab: id) => void,
|};

function TabbedHeader(props: Props): React.Node {
  const { children, stateCallback, options, modal } = props;
  const tabs = React.Children.toArray(children);
  const classes = cn("tab-header", {"modal-header": modal});

  return (
    <Card.Header className={classes}>
      <ul className="nav nav-tabs Tab_header_tabs">
        {tabs.map((tab, index) => {
          const {title, id} = tab.props
          return (
            <Nav.Item
              key={index}
              value={title}
              onClick={() => stateCallback(id)}
              active={id === props.selectedTab}
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
