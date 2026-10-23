import * as React from "react";
import cn from "classnames";

export type TableColProps = { readonly children?: React.ReactNode; readonly className?: string; readonly colSpan?: number; readonly alignContent?: "" | "left" | "center" | "right" };

function TableCol({
  className,
  children,
  alignContent = "",
  colSpan,
}: TableColProps): React.ReactNode {
  const classes = cn({ [`text-${alignContent}`]: alignContent }, className);
  return (
    <td className={classes} colSpan={colSpan}>
      {children}
    </td>
  );
}

TableCol.displayName = "Table.Col";

export default TableCol;
