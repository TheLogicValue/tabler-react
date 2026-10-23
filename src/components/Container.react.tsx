import * as React from "react";
import cn from "classnames";

import "./Container.css";

export type ContainerProps = {
  readonly children?: React.ReactNode;
  readonly className?: string;
};

function Container({ className, children }: ContainerProps): React.ReactElement {
  const classes = cn("container", className);
  return <div className={classes}>{children}</div>;
}

export default Container;
