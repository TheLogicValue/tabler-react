import * as React from "react";
import cn from "classnames";

export type MediaListItemProps = {
  readonly children?: React.ReactNode;
  readonly className?: string;
};

function MediaListItem({ className, children }: MediaListItemProps): React.ReactElement {
  const classes = cn("media mt-4", className);
  return <li className={classes}>{children}</li>;
}

export default MediaListItem;
