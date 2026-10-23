import * as React from "react";
import cn from "classnames";

export type ProgressBarProps = {
  readonly className?: string;
  readonly color?: string;
  readonly width?: number;
};

function ProgressBar({ className, color = "", width = 0 }: ProgressBarProps): React.ReactElement {
  const classes = cn(`progress-bar`, { [`bg-${color}`]: !!color }, className);
  return <div className={classes} style={{ width: `${width}%` }} />;
}

ProgressBar.displayName = "Progress.Bar";

export default ProgressBar;
