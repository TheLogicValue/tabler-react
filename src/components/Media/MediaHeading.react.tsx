import * as React from "react";
import cn from "classnames";

export type MediaHeadingProps = {
  readonly children?: React.ReactNode;
  readonly className?: string;
};

function MediaHeading({ className, children }: MediaHeadingProps): React.ReactElement {
  const classes = cn("media-heading", className);
  return <div className={classes}>{children}</div>;
}

export default MediaHeading;
