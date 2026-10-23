import * as React from "react";

export type DropdownItemDividerProps = {
  readonly children?: React.ReactNode;
};

/**
 * Used to seperate items within a Dropdown with a horizontal line
 */
function DropdownItemDivider(props: DropdownItemDividerProps): React.ReactNode {
  return <div className="dropdown-divider">{props.children}</div>;
}

DropdownItemDivider.displayName = "Dropdown.ItemDivider";

export default DropdownItemDivider;
