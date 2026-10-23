import * as React from "react";
import type { TabChildren, TabProps } from "./Tab.react";
export type TabbedContainerProps = {
  readonly children: TabChildren;
  readonly selectedTitle?: string;
};
function TabbedContainer(props: TabbedContainerProps): React.ReactNode {
  const tabs = React.Children.toArray(props.children).filter((child): child is React.ReactElement<TabProps> => React.isValidElement<TabProps>(child));
  return tabs.filter(tab => tab.props.title === props.selectedTitle);
}

/** @component */
export default TabbedContainer;
