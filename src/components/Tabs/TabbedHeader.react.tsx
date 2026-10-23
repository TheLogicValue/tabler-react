import * as React from "react";
import Nav from "../Nav/Nav.react";
import Card from "../Card/index";
import cn from "classnames";
import type { TabChildren, TabProps } from "./Tab.react";
export type TabbedHeaderProps = {
  readonly children: TabChildren;
  readonly selectedTitle?: string;
  readonly options?: React.ReactNode;
  readonly stateCallback: (selectedTitle: string) => void;
  readonly modal?: boolean;
};
function TabbedHeader(props: TabbedHeaderProps): React.ReactNode {
  const {
    children,
    stateCallback,
    options,
    modal
  } = props;
  const tabs = React.Children.toArray(children).filter((child): child is React.ReactElement<TabProps> => React.isValidElement<TabProps>(child));
  const classes = cn("tab-header", {
    "modal-header": modal
  });
  return <Card.Header className={classes}>
      <ul className="nav nav-tabs Tab_header_tabs">
        {tabs.map((tab, index) => {
        const title = tab.props.title;
        return <Nav.Item key={index} value={title} onClick={() => stateCallback(title)} active={title === props.selectedTitle} />;
      })}
      </ul>
      <Card.Options>
          {options}
      </Card.Options>
    </Card.Header>;
}
export default TabbedHeader;
