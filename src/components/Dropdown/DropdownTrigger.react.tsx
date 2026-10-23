import * as React from "react";
import cn from "classnames";
import Button from "../Button/Button.react";
import Icon from "../Icon";

import { FloatingReference } from "../../helpers/Floating.react";

export type DropdownTriggerProps = {
  readonly children?: React.ReactNode;
  readonly className?: string;
  /**
   * Display an arrow alongside the trigger content
   */
  readonly toggle?: boolean;
  /**
   * The value to be displayed within the trigger if children is not included
   */
  readonly value?: string;
  /**
   * Render a button with link styling or standard Button styling
   */
  readonly type?: "link" | "button";
  /**
   * The background color for a Button trigger
   */
  readonly color?: string;
  /**
   * An Icon displayed to the left of the trigger content
   */
  readonly icon?: string;
  /**
   * Is this trigger being used as a NavLink
   */
  readonly isNavLink?: boolean;
  /**
   * Is this trigger beind used as a Card.Header option
   */
  readonly isOption?: boolean;
  /**
   * Handle the onClick of this trigger
   */
  readonly onClick?: React.MouseEventHandler<HTMLButtonElement>;
  readonly rootRef?: React.Ref<HTMLButtonElement>;
};

/**
 * Provides the trigger element for a Dropdown
 */
function DropdownTrigger({
  className,
  toggle = true,
  value,
  children,
  type = "link",
  icon,
  color,
  isNavLink,
  isOption,
  onClick,
  rootRef,
}: DropdownTriggerProps): React.ReactNode {
  const classes = cn(
    { "dropdown-toggle": toggle, "nav-link-item": isNavLink },
    className
  );

  const childrenFragment = (
    <React.Fragment>
      {icon && (
        <React.Fragment>
          <Icon name={icon} />{" "}
        </React.Fragment>
      )}
      {value}
      {children}
    </React.Fragment>
  );

  return type === "link" ? (
    <FloatingReference rootRef={rootRef}>
      {({ ref, open }) => (
        <button type="button" className={cn("tabler-action tabler-dropdown-trigger", classes, { show: open })} onClick={onClick} ref={ref} aria-expanded={open ?? undefined} aria-haspopup="true" aria-label={!value && !children ? "Open menu" : undefined}>
          {childrenFragment}
        </button>
      )}
    </FloatingReference>
  ) : (
    <FloatingReference rootRef={rootRef}>
      {({ ref, open }) => (
        <Button
          type="button"
          className={classes}
          color={color}
          isDropdownToggle
          isOption={isOption}
          onClick={onClick}
          rootRef={ref}
          aria-expanded={open ?? undefined}
          aria-haspopup="true"
        >
          {childrenFragment}
        </Button>
      )}
    </FloatingReference>
  );
}

DropdownTrigger.displayName = "Dropdown.Trigger";

/** @component */
export default DropdownTrigger;
