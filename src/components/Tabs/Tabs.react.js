// @flow

import * as React from "react";

import Tab from "./Tab.react";
import TabbedContainer from "./TabbedContainer.react";
import TabbedHeader from "./TabbedHeader.react";
import cn from "classnames";

import "./Tabs.css";

type Props = {|
  +initialTab: string,
  +children: React.ChildrenArray<React.Element<typeof Tab>>,
  +options: React.Node,
  +className: string
|};

type State = {|
  selectedTitle: string,
|};

class Tabs extends React.PureComponent<Props, State> {
  state = {
    selectedTitle: this.props.initialTab,
  };

  render(): React.Node {
    const { children, options, className } = this.props;
    const { selectedTitle } = this.state;
    const classes = cn("card", className);

    return (
      <div className={classes}>
        <TabbedHeader
          selectedTitle={selectedTitle}
          stateCallback={newTitle => this.setState({ selectedTitle: newTitle })}
          options={options}
        >
          {children}
        </TabbedHeader>
        <TabbedContainer selectedTitle={selectedTitle}>
          {children}
        </TabbedContainer>
      </div>
    );
  }
}

export default Tabs;
