import * as React from "react";
import cn from "classnames";

export type TableRowProps = React.HTMLAttributes<HTMLTableRowElement> & { readonly className?: string; readonly children?: React.ReactNode };

function TableRow({ className, children, ...props }: TableRowProps): React.ReactNode {
  const classes = cn(className);
  return (
    <tr className={classes} {...props}>
      {children}
    </tr>
  );
}

TableRow.displayName = "Table.Row";

export default TableRow;
