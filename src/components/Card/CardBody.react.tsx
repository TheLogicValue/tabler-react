import * as React from "react";
import cn from "classnames";

export type CardBodyProps = {
  readonly children?: React.ReactNode;
  readonly className?: string;
};

function CardBody({ className, children }: CardBodyProps): React.ReactElement {
  const classes = cn("card-body", className);
  return <div className={classes}>{children}</div>;
}

CardBody.displayName = "Card.Body";

export default CardBody;
