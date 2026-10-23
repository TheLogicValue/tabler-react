import * as React from "react";
import cn from "classnames";

export type CardHeaderProps = {
  readonly children?: React.ReactNode;
  readonly className?: string;
  readonly backgroundURL?: string;
};

function CardHeader({
  className,
  children,
  backgroundURL = "",
}: CardHeaderProps): React.ReactElement {
  const classes = cn("card-header", className);

  return (
    <div
      className={classes}
      style={
        backgroundURL
          ? Object.assign({
              backgroundImage: `url(${backgroundURL})`,
            })
          : undefined
      }
    >
      {children}
    </div>
  );
}

CardHeader.displayName = "Card.Header";

export default CardHeader;
