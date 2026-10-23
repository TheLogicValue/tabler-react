import * as React from "react";
import cn from "classnames";

import ListItem from "./ListItem.react";
import ListGroup from "./ListGroup.react";
import ListGroupItem from "./ListGroupItem.react";

export type ListProps = {
  readonly children?: React.ReactNode;
  readonly className?: string;
  readonly unstyled?: boolean;
  readonly seperated?: boolean;
  readonly inline?: boolean;
};

function List({
  className,
  children,
  unstyled,
  seperated,
  inline,
}: ListProps): React.ReactNode {
  const classes = cn(
    {
      list: !unstyled,
      "list-unstyled": unstyled,
      "list-seperated": seperated,
      "list-inline": inline,
    },
    className
  );
  return <ul className={classes}>{children}</ul>;
}

List.Item = ListItem;
List.Group = ListGroup;
List.GroupItem = ListGroupItem;

export default List;
