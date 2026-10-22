// @flow

import * as React from "react";
import cn from "classnames";
import { FloatingSurface } from "../../helpers/Floating.react";

import type { Placement } from "../../helpers/Floating.react";
import "./Dropdown.css";

type StyleOffsets = { top: number, left: number };
type StylePosition = { position: "absolute" | "fixed" };
type Style = { [property: string]: string | number | null | void };

export type Props = {|
  +children?: React.Node,
  +className?: string,
  +position?: Placement,
  /**
   * Display an arrow pointing towards the trigger
   */
  +arrow?: boolean,
  /**
   * The position of the arrow pointing towards the trigger
   */
  +arrowPosition?: "left" | "right",
  +style?: Style & StyleOffsets & StylePosition,
  +rootRef?: (?HTMLElement) => void,
  /**
   * Show the DropdownMenu
   */
  show?: boolean,
  +vertical?: boolean,
|};

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
}: Props): React.Node {
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
