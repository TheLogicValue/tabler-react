import * as React from "react";
import cn from "classnames";
import Nav from "../Nav";
import Dropdown from "../Dropdown";
import Icon from "../Icon";
import type { subNavItem } from "./Nav.react";
import ClickOutside from "../../helpers/ClickOutside.react";

import { FloatingProvider, FloatingReference } from "../../helpers/Floating.react";
import type { Placement } from "../../helpers/Floating.react";
export type NavItemProps = {
  readonly children?: React.ReactNode;
  readonly className?: string;
  readonly value?: string;
  readonly LinkComponent?: React.ElementType;
  readonly href?: string;
  readonly to?: string;
  readonly icon?: string;
  readonly type?: "li" | "div";
  readonly vertical?: boolean;
  /**
   * Make this item behave like it has a subNav even if you dont use subItems or subItemsObjects
   */
  readonly hasSubNav?: boolean;
  readonly onClick?: () => void;
  /**
   * Display this item in an active, or currently viewing, state
   */
  readonly active?: boolean;
  readonly subItems?: React.ReactNode;
  readonly subItemsObjects?: ReadonlyArray<subNavItem>;
  /**
   * Position of the subnav Dropdown
   */
  readonly position?: Placement;
  /**
   * Whether or not to pass "exact" property to underlying NavLink component
   */
  readonly useExact?: boolean;
};

type NavItemState = {
  isOpen: boolean,
};

/**
 * A NavItem with Floating UI powered subItems Dropdowns
 */
class NavItem extends React.Component<NavItemProps, NavItemState> {
  displayName = "Nav.Item";

  state: NavItemState = {
    isOpen: false,
  };

  _handleOnClick = (event: React.MouseEvent<HTMLElement>): void => {
    
    if (((this.props.hasSubNav || this.props.subItems || this.props.subItemsObjects) && !this.props.vertical) || (this.props.vertical && !(event.target as HTMLElement).className.includes("nav-link-item-vertical"))) {
      this.setState(s => ({ isOpen: !s.isOpen }));
    }

    if (this.props.onClick) this.props.onClick();
  };

  render(): React.ReactNode {
    const {
      children,
      LinkComponent,
      value,
      className,
      to,
      type = "li",
      icon,
      hasSubNav: forcedHasSubNav,
      active,
      vertical,
      subItems,
      subItemsObjects,
      useExact,
      position = "bottom-start",
    }: NavItemProps = this.props;

    const hasSubNav = forcedHasSubNav || !!subItems || !!subItemsObjects;
    const navLink =
      (typeof children === "string" || value) && hasSubNav ? (
        <FloatingReference>
          {({ ref }) => (
            <Nav.Link
              className={className}
              to={to}
              icon={icon}
              RootComponent={LinkComponent}
              hasSubNav={hasSubNav}
              active={active}
              rootRef={ref}
              useExact={useExact}
            >
              {!hasSubNav && typeof children === "string" ? children : <span className="nav-link-title">{value}</span>}
              {hasSubNav && <Icon name="chevron-down" className="text-right"/>}
            </Nav.Link>
          )}
        </FloatingReference>
      ) : (
        <Nav.Link
          className={className}
          to={to}
          icon={icon}
          RootComponent={LinkComponent}
          hasSubNav={hasSubNav}
          active={active}
          useExact={useExact}
        >
          {!hasSubNav && typeof children === "string" ?  children : <span className="nav-link-title">{value}</span>}
          {hasSubNav && <Icon name="chevron-down" className="text-right"/>}
        </Nav.Link>
      );

    const childrenForAll = (
      <React.Fragment>
        {navLink}
        {typeof children !== "string" && !hasSubNav && children}
        {hasSubNav && (
          <Dropdown.Menu arrow={!vertical} vertical={vertical} show={this.state.isOpen} position={position}>
            {subItems ||
              (subItemsObjects &&
                subItemsObjects.map((a, i) => (
                  <Nav.SubItem
                    className={ vertical ? "nav-link-item-vertical" : ""}
                    key={i}
                    value={a.value}
                    to={a.to}
                    icon={a.icon}
                    onClick={a.onClick}
                    LinkComponent={a.LinkComponent}
                    useExact={a.useExact}
                  />
                ))) ||
              children}
          </Dropdown.Menu>
        )}
      </React.Fragment>
    );

    const wrapperClasses = cn({
      "nav-item": true,
      show: this.state.isOpen,
      "dropdown": vertical,
    });

    const wrappedChildren =
      type === "div" ? (
        <ClickOutside onOutsideClick={() => vertical ? null :this.setState({ isOpen: false })}>
          {({ setElementRef }) => (
            <div
              className={wrapperClasses}
              onClick={(e) => this._handleOnClick(e)}
              ref={setElementRef}
            >
              {childrenForAll}
            </div>
          )}
        </ClickOutside>
      ) : (
        <ClickOutside onOutsideClick={() => vertical ? null :this.setState({ isOpen: false })}>
          {({ setElementRef }) => (
            <li
              className={wrapperClasses}
              onClick={(e) => this._handleOnClick(e)}
              ref={setElementRef}
            >
              {childrenForAll}
            </li>
          )}
        </ClickOutside>
      );

    return hasSubNav ? <FloatingProvider onDismiss={() => this.setState({ isOpen: false })}>{wrappedChildren}</FloatingProvider> : wrappedChildren;
  }
}

/** @component */
export default NavItem;
