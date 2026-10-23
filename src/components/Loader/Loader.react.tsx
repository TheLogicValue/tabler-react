import * as React from "react";
import cn from "classnames";

export type LoaderProps = {
  readonly children?: React.ReactNode;
  readonly className?: string;
};

function Loader({ className, children }: LoaderProps): React.ReactElement {
  const classes = cn({ loader: true }, className);
  return <div className={classes}>{children}</div>;
}

Loader.displayName = "Loader";

export default Loader;
