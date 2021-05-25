// @flow
import * as React from "react";
import Dropdown from "../Dropdown";

type Props = {|
  +children?: React.Node,
  +className?: string,
  +LinkComponent?: React.ElementType,
  +to?: string,
  +icon?: string,
  +value?: string,
  +useExact?: boolean,
  +onClick?: (event: SyntheticMouseEvent<*>) => mixed,
|};

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
}: Props): React.Node {
  console.log(onClick)
  return (
    <Dropdown.Item className={className} onClick={onClick} to={to} icon={icon} RootComponent={LinkComponent} useExact={useExact || false}>
      {value || children}
    </Dropdown.Item>
  );
}

NavSubItem.displayName = "Nav.SubItem";

export default NavSubItem;
