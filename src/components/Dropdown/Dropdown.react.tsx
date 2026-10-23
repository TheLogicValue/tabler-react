import * as React from "react";
import cn from "classnames";
import DropdownTrigger from "./DropdownTrigger.react";
import DropdownMenu from "./DropdownMenu.react";
import DropdownItem from "./DropdownItem.react";
import DropdownItemDivider from "./DropdownItemDivider.react";

import ClickOutside from "../../helpers/ClickOutside.react";

import { FloatingProvider, FloatingReference, getElementRef } from "../../helpers/Floating.react";

import type { Placement } from "../../helpers/Floating.react";

export type DropdownCustomTriggerProps = {
  readonly rootRef?: React.Ref<HTMLElement>;
  readonly ref?: React.Ref<HTMLElement>;
  readonly onClick?: React.MouseEventHandler<HTMLElement>;
};
export type DropdownItemObject = {
  readonly icon?: string;
  readonly badge?: string;
  readonly badgeType?: string;
  readonly value?: string;
  readonly isDivider?: boolean;
  readonly to?: string;
  readonly RootComponent?: React.ElementType;
  readonly onClick?: React.MouseEventHandler<HTMLElement>;
};
export type itemObject = DropdownItemObject;

export type DropdownProps = {
  readonly children?: React.ReactNode;
  readonly className?: string;
  readonly desktopOnly?: boolean;
  readonly trigger?: React.ReactElement<DropdownCustomTriggerProps>;
  readonly isOption?: boolean;
  readonly flex?: boolean | "xs" | "sm" | "md" | "lg" | "xl";
  readonly triggerClassName?: string;
  readonly isNavLink?: boolean;
  readonly type?: "link" | "button";
  readonly icon?: string;
  readonly triggerContent?: React.ReactNode;
  readonly color?: string;
  readonly toggle?: boolean;
  readonly items?: React.ReactNode;
  readonly dropdownMenuClassName?: string;
  readonly position?: Placement;
  readonly arrow?: boolean;
  readonly arrowPosition?: "left" | "right";
  readonly itemsObject?: ReadonlyArray<DropdownItemObject>;
  readonly itemsRootComponent?: React.ElementType;
};

type DropdownState = { isOpen: boolean };

class Dropdown extends React.Component<DropdownProps, DropdownState> {
  state: DropdownState = { isOpen: false };

  static Trigger = DropdownTrigger;
  static Menu = DropdownMenu;
  static Item = DropdownItem;
  static ItemDivider = DropdownItemDivider;

  _handleTriggerOnClick = (e: React.MouseEvent<HTMLElement>, o?: DropdownCustomTriggerProps) => {
    e.preventDefault();
    this.setState(s => ({ isOpen: !s.isOpen }));
    if (o && o.onClick) {
      o.onClick(e);
    }
  };

  _handleItemClick = (
    e: React.MouseEvent<HTMLElement>,
    callback?: React.MouseEventHandler<HTMLElement>
  ) => {
    this.setState({ isOpen: false });
    if (callback) {
      callback(e);
    }
  };

  render(): React.ReactNode {
    const {
      className,
      children,
      desktopOnly,
      isOption,
      flex = false,
      ...props
    } = this.props;

    const classes = cn(
      {
        dropdown: true,
        "d-none": desktopOnly,
        "d-md-flex": desktopOnly || flex === "md",
        [`d-{flex}-flex`]: ["xs", "sm", "lg", "xl"].includes(flex as string),
        "d-flex": flex === true,
        "card-options-dropdown": isOption,
        show: this.state.isOpen,
      },
      className
    );

    const trigger = (() => {
      if (props.trigger) {
        const customTrigger = props.trigger;
        return <FloatingReference rootRef={customTrigger.props.rootRef || getElementRef(customTrigger)}>
          {({ ref }) => React.cloneElement(customTrigger, {
            ...(typeof customTrigger.type === "string" || (customTrigger.type as React.ExoticComponent).$$typeof
              ? { ref } : { rootRef: ref }),
            onClick: e => this._handleTriggerOnClick(e, customTrigger.props),
          })}
        </FloatingReference>;
      }
      if (props.icon || props.triggerContent || props.toggle) {
        const {
          icon,
          triggerContent,
          isNavLink,
          type,
          triggerClassName,
          color,
          toggle,
        } = props;

        return (
          <DropdownTrigger
            isNavLink={isNavLink}
            icon={icon}
            type={type}
            className={triggerClassName}
            isOption={isOption}
            color={color}
            toggle={toggle}
            onClick={this._handleTriggerOnClick}
          >
            {triggerContent}
          </DropdownTrigger>
        );
      }
      return null;
    })();

    const items = (() => {
      if (props.items) return props.items;
      if (props.itemsObject) {
        const { itemsObject, itemsRootComponent } = props;
        return itemsObject.map(
          (item, i) =>
            item.isDivider ? (
              <Dropdown.ItemDivider key={i} />
            ) : (
              <Dropdown.Item
                icon={item.icon}
                badge={item.badge}
                badgeType={item.badgeType}
                value={item.value}
                key={i}
                to={item.to}
                RootComponent={item.RootComponent || itemsRootComponent}
                onClick={e => this._handleItemClick(e, item.onClick)}
              />
            )
        );
      }
      return null;
    })();

    const menu = (() => {
      if (props.items || props.itemsObject) {
        const { position, arrow, arrowPosition, dropdownMenuClassName } = props;
        return (
          <DropdownMenu
            position={position}
            arrow={arrow}
            arrowPosition={arrowPosition}
            className={dropdownMenuClassName}
            show={this.state.isOpen}
          >
            {items}
          </DropdownMenu>
        );
      }
      return null;
    })();

    return (
      <FloatingProvider open={this.state.isOpen} onDismiss={() => this.setState({ isOpen: false })}>
        <ClickOutside onOutsideClick={() => this.setState({ isOpen: false })}>
          {({ setElementRef }) => (
            <div className={classes} ref={setElementRef}>
              {trigger}
              {menu || children}
            </div>
          )}
        </ClickOutside>
      </FloatingProvider>
    );
  }
}

export default Dropdown;
