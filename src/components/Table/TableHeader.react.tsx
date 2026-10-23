import * as React from "react";
import cn from "classnames";

export type TableHeaderProps = React.HTMLAttributes<HTMLTableSectionElement> & { readonly className?: string; readonly children?: React.ReactNode };

function TableHeader({ className, children, ...props }: TableHeaderProps): React.ReactNode {
  const classes = cn(className);
  return (
    <thead className={classes} {...props}>
        {children}
    </thead>
  );
}

TableHeader.displayName = "Table.Header";

export default TableHeader;
