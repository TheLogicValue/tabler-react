import * as React from "react";
import cn from "classnames";

export type NavSubmenuProps = {
  readonly children?: React.ReactNode;
  readonly className?: string;
};

function NavSubmenu({ className, children }: NavSubmenuProps): React.ReactNode {
  const classes = cn({ nav: true, "nav-submenu": true }, className);
  return <div className={classes}>{children}</div>;
}

NavSubmenu.displayName = "Nav.Submenu";

export default NavSubmenu;
