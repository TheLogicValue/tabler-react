import * as React from "react";
import cn from "classnames";

export type BadgeProps = {
  readonly children?: React.ReactNode;
  readonly className?: string;
  readonly color?: string;
};

/**
 * A small colored rectangle with rounded corners.
 */
function Badge({ className, children, color = "primary" }: BadgeProps): React.ReactElement {
  const classes = cn(
    {
      badge: true,
      [`badge-${color}`]: color,
    },
    className
  );
  return <span className={classes}>{children}</span>;
}

export default Badge;
