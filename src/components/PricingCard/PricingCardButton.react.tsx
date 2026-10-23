import * as React from "react";
import cn from "classnames";

// TODO : Add  color prop
export type PricingCardButtonProps = {
  readonly children?: React.ReactNode;
  readonly className?: string;
  readonly RootComponent?: React.ElementType;
  readonly active?: boolean;
  readonly href?: string;
  readonly to?: string;
  readonly onClick?: React.MouseEventHandler<HTMLElement>;
};

function PricingCardButton({
  className,
  children,
  RootComponent,
  active,
  href,
  to,
  onClick,
}: PricingCardButtonProps): React.ReactElement {
  const classes = cn("text-center", "mt-6");
  const Component = RootComponent || "a";
  const componentClasses = cn(
    "btn",
    active ? "btn-green" : "btn-secondary",
    "btn-block",
    className
  );

  const otherProps: {
    href?: string;
    to?: string;
    role?: "button";
    onClick?: React.MouseEventHandler<HTMLElement>;
  } = {};

  if (href) {
    otherProps.href = href;
  }

  if (to) {
    otherProps.to = to;
  }

  if (onClick) {
    otherProps.role = "button";
    otherProps.onClick = onClick;
  }

  return (
    <div className={classes}>
      <Component className={componentClasses} {...otherProps}>
        {children}
      </Component>
    </div>
  );
}

PricingCardButton.displayName = "PricingCard.Button";

export default PricingCardButton;
