import * as React from "react";
import cn from "classnames";

export type GridRowProps = {
  /** Contenido de la fila, normalmente uno o varios Grid.Col. */
  readonly children?: React.ReactNode;
  /** Clases adicionales del div de la fila. */
  readonly className?: string;
  /** Añade row-cards para agrupar tarjetas. */
  readonly cards?: boolean;
  /** Añade row-deck; el comportamiento visual depende de la hoja de estilos. */
  readonly deck?: boolean;
  /** Añade gutters-xs/sm/md/lg. La cadena vacía conserva los gutters del CSS. */
  readonly gutters?: "" | "xs" | "sm" | "md" | "lg";
  /** Sufijo de align-items-*, por ejemplo center. Se conserva el string abierto. */
  readonly alignItems?: string;
  /** Sufijo de justify-content-*, por ejemplo between. Se conserva el string abierto. */
  readonly justifyContent?: string;
};

function GridRow({
  className,
  children,
  cards,
  deck,
  gutters = "",
  alignItems = "",
  justifyContent = "",
}: GridRowProps): React.ReactElement {
  const classes: string = cn(
    `row`,
    {
      row: true,
      "row-cards": cards,
      "row-deck": deck,
      [`gutters-${gutters}`]: gutters,
      [`align-items-${alignItems}`]: alignItems,
      [`justify-content-${justifyContent}`]: justifyContent,
    },
    className
  );
  return <div className={classes}>{children}</div>;
}

GridRow.displayName = "Grid.Row";

/** @component */
export default GridRow;
