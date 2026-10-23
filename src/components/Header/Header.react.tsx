import * as React from "react";
import cn from "classnames";

import H1 from "./H1.react";
import H2 from "./H2.react";
import H3 from "./H3.react";
import H4 from "./H4.react";
import H5 from "./H5.react";
import H6 from "./H6.react";

export type HeaderProps = {
  /**
   * A component to use instead of a <div> as the root component
   */
  readonly RootComponent?: React.ElementType<{ className: string; children?: React.ReactNode }>;
  readonly children?: React.ReactNode;
  readonly className?: string;
  /**
   * The size of the header
   */
  readonly size?: 1 | 2 | 3 | 4 | 5 | 6;
};

/**
 * A header
 * By default renders a div not a <hX> tag and has no additional spacing classes applied
 */
function Header({
  RootComponent,
  className,
  children,
  size = 1,
}: HeaderProps): React.ReactElement {
  const classes = cn(`h${size}`, className);
  const Component = RootComponent || "div";
  return <Component className={classes}>{children}</Component>;
}

Header.H1 = H1;
Header.H2 = H2;
Header.H3 = H3;
Header.H4 = H4;
Header.H5 = H5;
Header.H6 = H6;

export default Header;
