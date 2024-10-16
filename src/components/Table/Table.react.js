// @flow

import * as React from "react";
import cn from "classnames";
import TableHeader from "./TableHeader.react";
import TableBody from "./TableBody.react";
import TableRow from "./TableRow.react";
import TableCol from "./TableCol.react";
import TableColHeader from "./TableColHeader.react";

type BodyItem = {|
  key: string | number,
  item: Array<{
    +content?: React.Node,
    +className?: string,
    +alignContent?: "left" | "center" | "right",
  }>
|};

type Props = {|
  +children?: React.Node,
  +className?: string,
  /**
   * Should this Table be optimized to contain Cards
   */
  +cards?: boolean,
  /**
   * Give the table striped rows
   */
  +striped?: boolean,
  /**
   * Make the table responsive
   */
  +responsive?: boolean,
  +highlightRowOnHover?: boolean,
  +hasOutline?: boolean,
  +verticalAlign?: "center",
  +headeritems?: Array<{ +content?: React.Node, +className?: string }>,
  +bodyitems?: Array<BodyItem>,
|};

function Table({
  className,
  children,
  cards = false,
  striped = false,
  responsive = false,
  highlightRowOnHover,
  hasOutline,
  verticalAlign,
  ...props
}: Props): React.Node {
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

  const header = props.headeritems && (
    <Table.Header>
      <Table.Row>
        {props.headeritems.map((item, i) => (
          <Table.ColHeader key={i} className={item.className}>
            {item.content}
          </Table.ColHeader>
        ))}
      </Table.Row>
    </Table.Header>
  );

  const body = props.bodyitems && (
    <Table.Body>
      {props.bodyitems.map((row, i) => (
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
