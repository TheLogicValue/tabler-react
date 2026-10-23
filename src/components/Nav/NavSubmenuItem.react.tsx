import * as React from "react";
import cn from "classnames";
import Icon from "../Icon";

export type NavSubmenuItemProps = {
  readonly children?: React.ReactNode;
  readonly className?: string;
  readonly RootComponent?: React.ElementType;
  readonly active?: boolean;
  readonly icon?: string;
  readonly to?: string;
};

function NavSubmenuItem({
  className,
  RootComponent,
  icon,
  children,
  active = false,
  to,
}: NavSubmenuItemProps): React.ReactNode {
  const classes = cn({ "nav-item": true, active: active }, className);
  const Component = RootComponent || "a";
  return (
    <Component className={classes} to={to}>
      {icon && (
        <React.Fragment>
          <Icon name={icon} />{" "}
        </React.Fragment>
      )}
      {children}
    </Component>
  );
}

NavSubmenuItem.displayName = "Nav.SubmenuItem";

export default NavSubmenuItem;
