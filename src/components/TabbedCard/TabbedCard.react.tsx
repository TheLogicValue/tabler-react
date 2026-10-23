import * as React from "react";
import Card from "../Card/Card.react";
import { TabbedContainer, TabbedHeader } from "../Tabs";
import type { TabChildren } from "../Tabs/Tab.react";

export type TabbedCardProps = {
  readonly initialTab: string;
  readonly children: TabChildren;
};

type State = {
  selectedTitle: string;
};

class TabbedCard extends React.PureComponent<TabbedCardProps, State> {
  state = {
    selectedTitle: this.props.initialTab,
  };

  render(): React.ReactElement {
    const { children } = this.props;
    const { selectedTitle } = this.state;
    return (
      <Card>
        <Card.Header>
          <TabbedHeader
            selectedTitle={selectedTitle}
            stateCallback={newTitle =>
              this.setState({ selectedTitle: newTitle })
            }
          >
            {children}
          </TabbedHeader>
        </Card.Header>
        <Card.Body>
          <TabbedContainer selectedTitle={selectedTitle}>
            {children}
          </TabbedContainer>
        </Card.Body>
      </Card>
    );
  }
}

export default TabbedCard;
