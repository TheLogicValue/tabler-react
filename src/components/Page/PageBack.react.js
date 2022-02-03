// @flow

import * as React from "react";
import cn from "classnames";

type Props = {|
  +children ?: React.Node,
    +className ?: string,
|};

export default function PageBack({ className, children }: Props): React.Node {
    const classes = cn("page-back", className);
    return <span className={classes}>{children}</span>;
}
PageBack.displayName = "Page.Back";
