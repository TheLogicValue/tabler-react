import * as React from "react";
import cn from "classnames";
import Icon from "../Icon";

export type NavLinkProps = {
  readonly children?: React.ReactNode;
  readonly className?: string;
  readonly RootComponent?: React.ElementType;
  readonly active?: boolean;
  readonly icon?: string;
  readonly to?: string;
  readonly hasSubNav?: boolean;
  readonly rootRef?: React.Ref<HTMLAnchorElement>;
  readonly useExact?: boolean;
};

function NavLink({
  children,
  className,
  RootComponent,
  icon,
  active = false,
  to,
  hasSubNav,
  rootRef,
  useExact,
}: NavLinkProps): React.ReactNode {
  const classes = cn({ "nav-link-item": true, active: active }, className);

  const childrenForAll = (
    <React.Fragment>
      {icon && (
        <React.Fragment>
          <Icon name={icon} />{" "}
        </React.Fragment>
      )}
      {children}
    </React.Fragment>
  );
  return RootComponent ? (
    <RootComponent exact={useExact || false} className={classes} to={to} ref={rootRef}>
      {childrenForAll}
    </RootComponent>
  ) : (
    <a className={classes} href={to} ref={rootRef}>
      {childrenForAll}
    </a>
  );
}

NavLink.displayName = "Nav.Link";

/** @component */
export default NavLink;
