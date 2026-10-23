import * as React from "react";
import cn from "classnames";

export type CardOptionsProps = {
  readonly children?: React.ReactNode;
  readonly className?: string;
};

function CardOptions({ className, children }: CardOptionsProps): React.ReactElement {
  const classes = cn("card-options", className);
  return <div className={classes}>{children}</div>;
}

CardOptions.displayName = "Card.Options";

export default CardOptions;
