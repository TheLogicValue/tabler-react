import * as React from "react";
import cn from "classnames";

export type PricingCardAttributeListProps = {
  readonly children?: React.ReactNode;
  readonly className?: string;
};

function PricingCardAttributeList({ className, children }: PricingCardAttributeListProps): React.ReactElement {
  const classes = cn("list-unstyled", "leading-loose", className);
  return <ul className={classes}>{children}</ul>;
}

PricingCardAttributeList.displayName = "PricingCard.AttributeList";

export default PricingCardAttributeList;
