import * as React from "react";
import cn from "classnames";

export type CardFooterProps = {
  readonly children?: React.ReactNode;
  readonly className?: string;
};

function CardFooter({ className, children }: CardFooterProps): React.ReactElement {
  const classes = cn("card-footer", className);
  return <div className={classes}>{children}</div>;
}

CardFooter.displayName = "Card.Footer";

export default CardFooter;
