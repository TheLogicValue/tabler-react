import * as React from "react";
import cn from "classnames";

export type ListItemProps = {
  readonly children?: React.ReactNode;
  readonly className?: string;
  readonly inline?: boolean;
};

function ListItem({ className, children, inline }: ListItemProps): React.ReactNode {
  const classes = cn({ "list-inline-item": inline }, className);
  return <li className={classes}>{children}</li>;
}

ListItem.displayName = "List.Item";

export default ListItem;
