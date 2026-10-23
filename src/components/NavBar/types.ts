import type * as React from "react";

export type NavBarSubItem = {
  readonly value: string;
  readonly to?: string;
  readonly LinkComponent?: boolean | React.ElementType;
  readonly onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};
export type NavBarMenuItem = NavBarSubItem & {
  readonly icon?: string;
  readonly className?: string;
  readonly subItems?: ReadonlyArray<NavBarSubItem>;
};
export type NavBarMenuProps = {
  readonly items: ReadonlyArray<NavBarMenuItem>;
  readonly rootIndex?: number;
};
export type NavBarItemProps = Partial<NavBarSubItem> & {
  readonly className?: string;
  readonly menuItem?: boolean;
  readonly rootIndex?: number;
  readonly children?: React.ReactNode;
};
export type NavBarDropdownProps = {
  readonly value?: string;
  readonly submenus: ReadonlyArray<NavBarSubItem>;
  readonly icon?: string;
};
