import * as React from "react";
export type TabProps = {
  readonly title: string;
  readonly children?: React.ReactNode;
  readonly style?: React.CSSProperties;
};
export type TabChildren = React.ReactElement<TabProps> | null | undefined | boolean | readonly TabChildren[];
class Tab extends React.PureComponent<TabProps> {
  render(): React.ReactNode {
    return <div className="card-body">
              {this.props.children}
            </div>;
  }
}
export default Tab;
