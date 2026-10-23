import * as React from "react";
import Dropdown from "../Dropdown";

export type NavSubItemProps = {
  readonly children?: React.ReactNode;
  readonly className?: string;
  readonly LinkComponent?: React.ElementType;
  readonly to?: string;
  readonly icon?: string;
  readonly hasSubNav?: boolean;
  readonly value?: string;
  readonly useExact?: boolean;
  readonly onClick?: React.MouseEventHandler<HTMLElement>;
};

function NavSubItem({
  children,
  LinkComponent,
  className,
  to,
  icon,
  hasSubNav,
  value,
  useExact,
  onClick
}: NavSubItemProps): React.ReactNode {
  return (
    <Dropdown.Item className={className} onClick={onClick} to={to} icon={icon} RootComponent={LinkComponent} useExact={useExact || false}>
      {value || children}
    </Dropdown.Item>
  );
}

NavSubItem.displayName = "Nav.SubItem";

export default NavSubItem;
