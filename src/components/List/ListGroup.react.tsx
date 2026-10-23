import * as React from "react";
import cn from "classnames";

export type ListGroupProps = {
  readonly children?: React.ReactNode;
  readonly className?: string;
  readonly transparent?: boolean;
  readonly isCardBody?: boolean;
};

function ListGroup({
  className,
  children,
  transparent,
  isCardBody,
}: ListGroupProps): React.ReactNode {
  const classes = cn(
    "list-group",
    "mb-0",
    {
      "list-group-transparent": transparent,
      "card-list-group": isCardBody,
    },
    className
  );
  return <div className={classes}>{children}</div>;
}

ListGroup.displayName = "List.Group";

export default ListGroup;
