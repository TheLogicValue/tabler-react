import * as React from "react";
import cn from "classnames";

export type DimmerContentProps = {
  readonly children?: React.ReactNode;
  readonly className?: string;
};

function DimmerContent({ className, children }: DimmerContentProps): React.ReactElement {
  const classes = cn({ "dimmer-content": true }, className);
  return <div className={classes}>{children}</div>;
}

DimmerContent.displayName = "Dimmer.Content";

export default DimmerContent;
