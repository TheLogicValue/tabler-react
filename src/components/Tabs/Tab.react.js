// @flow

import * as React from "react";

type Props = {|
  title: string,
  children: React.Node,
|};

type State = {||};

class Tab extends React.PureComponent<Props, State> {
  render(): React.Node {
    return <div className="card-body">
              {this.props.children}
            </div>
  }
}

export default Tab;
