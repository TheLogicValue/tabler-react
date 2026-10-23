import * as React from "react";
import cn from "classnames";

export type CardStatusProps = {
  readonly children?: React.ReactNode;
  readonly className?: string;
  readonly color: string;
  readonly side?: boolean;
};

function CardStatus({ className, children, color, side }: CardStatusProps): React.ReactElement {
  const classes = cn(
    {
      "card-status": true,
      [`bg-${color}`]: true,
      [`card-status-left`]: side,
    },
    className
  );
  return <div className={classes}>{children}</div>;
}

CardStatus.displayName = "Card.Status";

export default CardStatus;
