import * as React from "react";
import cn from "classnames";

export type CardTitleProps = {
  readonly children?: React.ReactNode;
  readonly className?: string;
  readonly RootComponent?: React.ElementType<{ className: string; children?: React.ReactNode }>;
};

function CardTitle({ className, children, RootComponent }: CardTitleProps): React.ReactElement {
  const classes = cn("card-title", className);
  const Component = RootComponent || "h3";
  return <Component className={classes}>{children}</Component>;
}

CardTitle.displayName = "Card.Title";

export default CardTitle;
