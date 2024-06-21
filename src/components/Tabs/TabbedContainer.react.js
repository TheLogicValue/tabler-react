// @flow

import * as React from "react";

import Tab from "./Tab.react";

type Props = {|
  +children: React.ChildrenArray<React.Element<typeof Tab>>,
  +selectedTab: number,
|};

function TabbedContainer(props: Props): React.Node {
  const tabs = React.Children.toArray(props.children);
  return tabs.filter(tab => tab.props.id === props.selectedTab);
}

/** @component */
export default TabbedContainer;
