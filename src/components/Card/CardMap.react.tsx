import * as React from "react";
import cn from "classnames";

export type CardMapProps = {
  readonly children?: React.ReactNode;
  readonly className?: string;
  readonly placeholder?: string;
};

function CardMap({ className, children, placeholder }: CardMapProps): React.ReactElement {
  const classes = cn(
    "card-map",
    { "card-map-placeholder": placeholder },
    className
  );
  return (
    <div
      className={classes}
      style={placeholder ? { backgroundImage: `url(${placeholder})` } : undefined}
    >
      {children}
    </div>
  );
}

CardMap.displayName = "Card.Map";

export default CardMap;
