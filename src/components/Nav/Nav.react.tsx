import * as React from "react";
import cn from "classnames";
import NavItem from "./NavItem.react";
import NavLink from "./NavLink.react";
import NavSubItem from "./NavSubItem.react";
import NavSubmenu from "./NavSubmenu.react";
import NavSubmenuItem from "./NavSubmenuItem.react";

export type SubNavItem = {
  readonly value: string;
  readonly to?: string;
  readonly icon?: string;
  readonly LinkComponent?: React.ElementType;
  readonly useExact?: boolean;
  readonly onClick?: React.MouseEventHandler<HTMLElement>;
};

export type NavItemObject = {
  readonly value: string;
  readonly to?: string;
  readonly icon?: string;
  readonly active?: boolean;
  readonly LinkComponent?: React.ElementType;
  readonly subItems?: ReadonlyArray<SubNavItem>;
  readonly useExact?: boolean;
};

export type NavRouterContextProps = { readonly callback: (location: { pathname: string }) => void };

export type NavProps = {
  readonly children?: React.ReactNode;
  readonly className?: string;
  readonly tabbed?: boolean;
  readonly vertical?: boolean;
  readonly items?: React.ReactNode;
  readonly itemsObjects?: ReadonlyArray<NavItemObject>;
  readonly routerContextComponentType?: React.ElementType<NavRouterContextProps>;
};

type NavState = {
  pathName: string | null,
};

class Nav extends React.Component<NavProps, NavState> {
  state: NavState = {
    pathName: null,
  };

  static Item = NavItem;
  static SubItem = NavSubItem;
  static Link = NavLink;
  static Submenu = NavSubmenu;
  static SubmenuItem = NavSubmenuItem;

  routerCallback = (location: { pathname: string }): void => {
    this.setState({ pathName: location.pathname });
  };

  computeActive(
    initialValue?: boolean,
    to?: string,
    subItems?: ReadonlyArray<SubNavItem>
  ): boolean {
    const { pathName } = this.state;

    if (
      initialValue !== null &&
      initialValue !== undefined &&
      initialValue === true
    ) {
      return true;
    }

    if (to !== null && to !== undefined && to === pathName) {
      return true;
    }

    if (subItems !== null && subItems !== undefined) {
      if (
        subItems.find(
          item =>
            item.to !== null && item.to !== undefined && item.to === pathName
        )
      ) {
        return true;
      }
    }

    return false;
  }

  render(): React.ReactNode {
    const {
      className,
      children,
      tabbed = true,
      vertical = false,
      items,
      itemsObjects,
      routerContextComponentType,
    } = this.props;
    const classes = cn({ nav: true, "nav-tabs": tabbed }, className);

    let element: React.ReactElement | null = null;
    if (routerContextComponentType) {
      element = React.createElement(routerContextComponentType, {
        callback: this.routerCallback,
      });
    }

    return (
      <React.Fragment>
        {element}
        <ul className={classes}>
          {items ||
            (itemsObjects &&
              itemsObjects.map((a, i) => (
                <Nav.Item
                  vertical={vertical}
                  key={i}
                  icon={a.icon}
                  value={a.value}
                  to={a.to}
                  hasSubNav={!!a.subItems}
                  LinkComponent={a.LinkComponent}
                  subItemsObjects={a.subItems}
                  active={this.computeActive(a.active, a.to, a.subItems)}
                  useExact={a.useExact}
                />
              ))) ||
            children}
        </ul>
      </React.Fragment>
    );
  }
}

//Nav.Item = NavItem;

export default Nav;

export type subNavItem = SubNavItem;
