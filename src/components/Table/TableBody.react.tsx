import * as React from "react";
import cn from "classnames";

export type TableBodyProps = React.HTMLAttributes<HTMLTableSectionElement> & { readonly className?: string; readonly children?: React.ReactNode };

function TableBody({ className, children, ...props }: TableBodyProps): React.ReactNode {
  const classes = cn(className);
  return (
    <tbody className={classes} {...props}>
      {children}
    </tbody>
  );
}

TableBody.displayName = "Table.Body";

export default TableBody;
