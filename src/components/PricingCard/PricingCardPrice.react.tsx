import * as React from "react";
import cn from "classnames";
// TODO:Add size options
export type PricingCardPriceProps = {
  readonly children?: React.ReactNode;
  readonly className?: string;
};

function PricingCardPrice({ className, children }: PricingCardPriceProps): React.ReactElement {
  const classes = cn("display-3 my-4", className);
  return <div className={classes}>{children}</div>;
}

PricingCardPrice.displayName = "PricingCard.Price";

export default PricingCardPrice;
