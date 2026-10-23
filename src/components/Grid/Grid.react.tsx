import * as React from "react";
import GridRow from "./GridRow.react";
import GridCol from "./GridCol.react";

export type GridProps = {
  /** Contenido devuelto directamente, sin añadir un contenedor al DOM. */
  readonly children: React.ReactNode;
};

function Grid(props: GridProps): React.ReactNode {
  return props.children;
}

Grid.Row = GridRow;
Grid.Col = GridCol;

Grid.displayName = "Grid";

/** @component */
export default Grid;
