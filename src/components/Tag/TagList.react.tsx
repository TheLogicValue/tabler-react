import * as React from "react";
import cn from "classnames";

export type TagListProps = {
  readonly children?: React.ReactNode;
  readonly className?: string;
};

/**
 * Adds a space between its child Tags
 */
function TagList(props: TagListProps): React.ReactElement {
  const { children, className } = props;
  const classes = cn("tags", className);
  return <div className={classes}>{children}</div>;
}

TagList.displayName = "Tag.List";

export default TagList;
