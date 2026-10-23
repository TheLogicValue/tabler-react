import * as React from "react";
import cn from "classnames";

export type PricingCardCategoryProps = {
  readonly children?: React.ReactNode;
  readonly className?: string;
};

function PricingCardCategory({ className, children }: PricingCardCategoryProps): React.ReactElement {
  const classes = cn("card-category", className);
  return <div className={classes}>{children}</div>;
}

PricingCardCategory.displayName = "PricingCard.Category";

export default PricingCardCategory;
