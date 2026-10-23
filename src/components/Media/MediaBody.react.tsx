import * as React from "react";
import cn from "classnames";

export type MediaBodyProps = {
  readonly children?: React.ReactNode;
  readonly className?: string;
};

function MediaBody({ className, children }: MediaBodyProps): React.ReactElement {
  const classes = cn("media-body", className);

  return <div className={classes}>{children}</div>;
}

export default MediaBody;
