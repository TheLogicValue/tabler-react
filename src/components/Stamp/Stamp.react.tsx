import * as React from "react";
import cn from "classnames";
import Icon from "../Icon";

export type StampProps = {
  readonly children?: React.ReactNode;
  readonly className?: string;
  readonly size?: "sm" | "md";
  readonly icon?: string;
  readonly color?: string;
};

function Stamp({
  children,
  className,
  size = "md",
  icon,
  color = "",
}: StampProps): React.ReactElement {
  const classes = cn(
    { stamp: true, [`stamp-${size}`]: size, [`bg-${color}`]: color },
    className
  );
  return (
    <span className={classes}>
      {icon && <Icon name={icon} />}
      {children}
    </span>
  );
}

Stamp.displayName = "Stamp";

export default Stamp;
