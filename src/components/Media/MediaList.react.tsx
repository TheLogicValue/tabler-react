import * as React from "react";
import cn from "classnames";

export type MediaListProps = {
  readonly children?: React.ReactNode;
  readonly className?: string;
};

function MediaList({ className, children }: MediaListProps): React.ReactElement {
  const classes = cn("media-list", className);
  return <ul className={classes}>{children}</ul>;
}

export default MediaList;
