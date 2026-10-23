import * as React from "react";
import cn from "classnames";

export type TableColHeaderProps = { readonly children?: React.ReactNode; readonly className?: string; readonly colSpan?: number; readonly alignContent?: "" | "left" | "center" | "right" };

function TableColHeader({
  className,
  children,
  colSpan,
  alignContent = "",
}: TableColHeaderProps): React.ReactNode {
  const classes = cn({ [`text-${alignContent}`]: alignContent }, className);
  return (
    <th className={classes} colSpan={colSpan}>
      {children}
    </th>
  );
}

TableColHeader.displayName = "Table.ColHeader";

export default TableColHeader;
