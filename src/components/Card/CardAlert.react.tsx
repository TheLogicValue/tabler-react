import * as React from "react";
import cn from "classnames";

export type CardAlertProps = {
  readonly children?: React.ReactNode;
  readonly className?: string;
  readonly color: string;
};

function CardAlert({ className, children, color }: CardAlertProps): React.ReactElement {
  const classes = cn(`card-alert alert alert-${color} mb-0`, className);
  return <div className={classes}>{children}</div>;
}

CardAlert.displayName = "Card.Alert";

export default CardAlert;
