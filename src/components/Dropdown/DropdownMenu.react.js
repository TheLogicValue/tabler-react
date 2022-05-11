// @flow

import * as React from "react";
import cn from "classnames";
import { Popper } from "react-popper";

import type { Placement, PopperChildrenProps } from "react-popper";

type StyleOffsets = { top: number, left: number };
type StylePosition = { position: "absolute" | "fixed" };

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
      >
        {children}
      </div>)
    );
  }
  else{
    return (
      show && (
        <Popper placement={position} eventsEnabled={true} positionFixed={false}>
          {({ ref, style, placement }: PopperChildrenProps) => {
            return (
              <div
                className={classes}
                data-placement={placement}
                style={style}
                ref={ref}
              >
                {children}
              </div>
            );
          }}
        </Popper>
      )
    );
  }
}

DropdownMenu.displayName = "Dropdown.Menu";

export default DropdownMenu;
