// @flow
import * as React from "react";
import cn from "classnames";
import Nav from "../Nav";
import Dropdown from "../Dropdown";
import Icon from "../Icon";
import type { subNavItem } from "./Nav.react";
import ClickOutside from "../../helpers/ClickOutside.react";

import { Manager, Reference } from "react-popper";
import type { Placement, ReferenceChildrenProps } from "react-popper";
type Props = {|
  +children?: React.Node,
  +className?: string,
  +value?: string,
  +LinkComponent?: React.ElementType,
  +href?: string,
  +to?: string,
  +icon?: string,
  +type?: "li" | "div",
  +vertical?: boolean,
  /**
   * Make this item behave like it has a subNav even if you dont use subItems or subItemsObjects
   */
  +hasSubNav?: boolean,
  +onClick?: () => void,
  /**
   * Display this item in an active, or currently viewing, state
   */
  +active?: boolean,
  +subItems?: React.ChildrenArray<React.Element<typeof Nav.SubItem>>,
  +subItemsObjects?: Array<subNavItem>,
  /**
   * Position of the subnav Dropdown
   */
  +position?: Placement,
  /**
   * Whether or not to pass "exact" property to underlying NavLink component
   */
  +useExact?: boolean,
|};

type State = {
  isOpen: boolean,
};

/**
 * A NavItem with react-popper powered subIems Dropdowns
 */
class NavItem extends React.Component<Props, State> {
  displayName = "Nav.Item";

  state = {
    isOpen: false,
  };

  _handleOnClick = (): void => {
    if (this.props.hasSubNav) {
      this.setState(s => ({ isOpen: !s.isOpen }));
    }
    if (this.props.onClick) this.props.onClick();
  };

  render(): React.Node {
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
    }: Props = this.props;

    const hasSubNav = forcedHasSubNav || !!subItems || !!subItemsObjects;
    const navLink =
      (typeof children === "string" || value) && hasSubNav ? (
        <Reference>
          {({ ref }: ReferenceChildrenProps) => (
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
        </Reference>
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
                    className={ vertical ? "nav-link-vertical" : ""}
                    key={i}
                    value={a.value}
                    to={a.to}
                    icon={a.icon}
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
              onClick={this._handleOnClick}
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
              onClick={this._handleOnClick}
              ref={setElementRef}
            >
              {childrenForAll}
            </li>
          )}
        </ClickOutside>
      );

    return hasSubNav ? <Manager>{wrappedChildren}</Manager> : wrappedChildren;
  }
}

/** @component */
export default NavItem;
