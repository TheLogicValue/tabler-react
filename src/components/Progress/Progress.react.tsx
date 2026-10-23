import * as React from "react";
import cn from "classnames";
import ProgressBar from "./ProgressBar.react";

export type ProgressProps = {
  readonly children?: React.ReactNode;
  readonly className?: string;
  readonly size?: string;
};

function Progress({ className, children, size = "" }: ProgressProps): React.ReactElement {
  const classes = cn(`progress`, { [`progress-${size}`]: !!size }, className);
  return <div className={classes}>{children}</div>;
}

Progress.Bar = ProgressBar;

export default Progress;
