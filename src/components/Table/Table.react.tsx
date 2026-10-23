import * as React from "react";
import cn from "classnames";
import TableHeader from "./TableHeader.react";
import TableBody from "./TableBody.react";
import TableRow from "./TableRow.react";
import TableCol from "./TableCol.react";
import TableColHeader from "./TableColHeader.react";

export type TableCell = { readonly content?: React.ReactNode; readonly className?: string; readonly alignContent?: "left" | "center" | "right" };
export type TableBodyItem = { readonly key: string | number; readonly item: readonly TableCell[] };
export type TableProps = React.TableHTMLAttributes<HTMLTableElement> & {
  readonly children?: React.ReactNode;
  readonly className?: string;
  readonly cards?: boolean; readonly striped?: boolean; readonly responsive?: boolean; readonly highlightRowOnHover?: boolean; readonly hasOutline?: boolean; readonly verticalAlign?: "center";
  readonly headeritems?: readonly Pick<TableCell, "content" | "className">[]; readonly bodyitems?: readonly TableBodyItem[];
};

function Table({
  className,
  children,
  cards = false,
  striped = false,
  responsive = false,
  highlightRowOnHover,
  hasOutline,
  verticalAlign,
  headeritems,
  bodyitems,
  ...props
}: TableProps): React.ReactNode {
  const classes = cn(
    "table",
    {
      "card-table": cards,
      "table-striped": striped,
      "table-hover": highlightRowOnHover,
      "table-outline": hasOutline,
      "table-vcenter": verticalAlign === "center",
    },
    className
  );

  const header = headeritems && (
    <Table.Header>
      <Table.Row>
        {headeritems.map((item, i) => (
          <Table.ColHeader key={i} className={item.className}>
            {item.content}
          </Table.ColHeader>
        ))}
      </Table.Row>
    </Table.Header>
  );

  const body = bodyitems && (
    <Table.Body>
      {bodyitems.map((row, i) => (
        <Table.Row key={row.key}>
          {row.item.map((col, i) => (
            <Table.Col
              className={col.className}
              alignContent={col.alignContent}
              key={i}
            >
              {col.content}
            </Table.Col>
          ))}
        </Table.Row>
      ))}
    </Table.Body>
  );

  const table = (
    <table className={classes} {...props}>
      {header}
      {body || children}
    </table>
  );

  return !responsive ? table : <div className="table-responsive">{table}</div>;
}

Table.Header = TableHeader;
Table.Body = TableBody;
Table.Row = TableRow;
Table.Col = TableCol;
Table.ColHeader = TableColHeader;

/** @component */
export default Table;
