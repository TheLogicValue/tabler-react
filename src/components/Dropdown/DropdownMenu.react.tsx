import * as React from "react";
import cn from "classnames";
import { FloatingSurface } from "../../helpers/Floating.react";

import type { Placement } from "../../helpers/Floating.react";
import "./Dropdown.css";

export type DropdownMenuProps = {
  readonly children?: React.ReactNode;
  readonly className?: string;
  readonly position?: Placement;
  /**
   * Display an arrow pointing towards the trigger
   */
  readonly arrow?: boolean;
  /**
   * The position of the arrow pointing towards the trigger
   */
  readonly arrowPosition?: "left" | "right";
  readonly style?: React.CSSProperties;
  readonly rootRef?: React.Ref<HTMLDivElement>;
  /**
   * Show the DropdownMenu
   */
  readonly show?: boolean;
  readonly vertical?: boolean;
};

/**
 * The wrapper element for a Dropdowns Items
 */
function DropdownMenu({
  className,
  children,
  position = "bottom",
  arrow,
  arrowPosition = "left",
  style,
  rootRef,
  vertical,
  show = false,
}: DropdownMenuProps): React.ReactNode {
  const classes = cn(
    {
      "dropdown-menu": !vertical,
      [`dropdown-menu-${arrowPosition}`]: arrowPosition,
      [`dropdown-menu-arrow`]: arrow,
      show: show,
    },
    className
  );
  if (vertical){
    return (
      show && (
      <div
        className={classes}
        ref={rootRef}
        style={style}
      >
        {children}
      </div>)
    );
  }
  else{
    return <FloatingSurface placement={position} open={show} rootRef={rootRef}
      className={classes} style={style}>{children}</FloatingSurface>;
  }
}

DropdownMenu.displayName = "Dropdown.Menu";

export default DropdownMenu;

// Retain the short source type alias for internal imports.
export type Props = DropdownMenuProps;
