import * as React from "react";
import cn from "classnames";
import Header from "./Header.react";

export type H5Props = {
  readonly children?: React.ReactNode;
  readonly className?: string;
};

/**
 * A Header component rendered as a h5 HTML element with a margin below
 */
function H5({ className, children }: H5Props): React.ReactElement {
  const classes: string = cn("mt-0 mb-4", className);
  return (
    <Header RootComponent="h5" className={classes} size={5}>
      {children}
    </Header>
  );
}

H5.displayName = "Header.H5";

export default H5;
