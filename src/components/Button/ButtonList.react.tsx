import * as React from "react";
import cn from "classnames";

export type ButtonListProps = {
  readonly children?: React.ReactNode;
  readonly className?: string;
  readonly align?: "" | "left" | "center" | "right";
} & Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "className" | "align">;

function ButtonList({
  className,
  children,
  align = "",
  ...props
}: ButtonListProps): React.ReactElement {
  const classes = cn(
    { "btn-list": true, [`text-${align}`]: !!align },
    className
  );
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}

ButtonList.displayName = "Button.List";

export default ButtonList;
