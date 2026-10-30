import SafeLink from "../../helpers/SafeLink.react";
import * as React from "react";
import cn from "classnames";

import Icon from "../Icon";

export type ListGroupItemProps = {
  readonly children?: React.ReactNode;
  readonly className?: string;
  readonly RootComponent?: React.ElementType;
  readonly active?: boolean;
  readonly action?: boolean;
  readonly icon?: string;
  readonly to?: string;
};

function ListGroupItem({
  className,
  children,
  RootComponent,
  active,
  action,
  icon,
  to,
}: ListGroupItemProps): React.ReactNode {
  const classes = cn(
    "list-group-item",
    {
      "list-group-item-action": action,
    },
    {
      active: active,
    },
    className
  );
  // const Component = RootComponent || "a";
  return RootComponent ? (
    <SafeLink RootComponent={RootComponent} to={to} className={classes}>
      {icon && (
        <span className="mr-3 icon">
          <Icon prefix="fe" name={icon} />{" "}
        </span>
      )}
      {children}
    </SafeLink>
  ) : (
    <SafeLink className={classes} href={to}>
      {icon && (
        <span className="mr-3 icon">
          <Icon prefix="fe" name={icon} />{" "}
        </span>
      )}
      {children}
    </SafeLink>
  );
}

ListGroupItem.displayName = "List.GroupItem";

/** @component */
export default ListGroupItem;
