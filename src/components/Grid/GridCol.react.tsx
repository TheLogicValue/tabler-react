import * as React from "react"
import cn from "classnames"

export type GridColProps = {
  /** Contenido del div de la columna. */
  readonly children?: React.ReactNode;
  /** Clases adicionales; no se reenvían otros atributos al div. */
  readonly className?: string;
  /** Añade col-N. 0 omite la clase; se utiliza normalmente una escala de 12. */
  readonly width?: number;
  /** Añade la clase heredada col-xs-N; su efecto requiere CSS que la defina. */
  readonly xs?: number;
  /** Añade la clase heredada col-xs-auto. */
  readonly xsAuto?: boolean;
  /** Añade col-sm-N. 0 omite esta variante. */
  readonly sm?: number;
  /** Añade col-sm-auto. */
  readonly smAuto?: boolean;
  /** Añade col-md-N. 0 omite esta variante. */
  readonly md?: number;
  /** Añade col-md-auto. */
  readonly mdAuto?: boolean;
  /** Añade col-lg-N. 0 omite esta variante. */
  readonly lg?: number;
  /** Añade col-lg-auto. */
  readonly lgAuto?: boolean;
  /** Añade col-xl-N. 0 omite esta variante. */
  readonly xl?: number;
  /** Añade col-xl-auto. */
  readonly xlAuto?: boolean;
  /** Añade col-2xl-N; la disponibilidad del breakpoint depende del CSS. */
  readonly xl2?: number;
  /** Añade col-2xl-auto. Se admiten booleanos y los números de la API heredada. */
  readonly xl2Auto?: boolean | number;
  /** Añade col-3xl-N; la disponibilidad del breakpoint depende del CSS. */
  readonly xl3?: number;
  /** Añade col-3xl-auto. Un número distinto de 0 activa la clase, igual que true. */
  readonly xl3Auto?: boolean | number;
  /** Añade col-4xl-N; la disponibilidad del breakpoint depende del CSS. */
  readonly xl4?: number;
  /** Añade col-4xl-auto; conserva compatibilidad con valores numéricos. */
  readonly xl4Auto?: boolean | number;
  /** Añade col-6xl-N; la disponibilidad del breakpoint depende del CSS. */
  readonly xl6?: number;
  /** Añade col-6xl-auto; conserva compatibilidad con valores numéricos. */
  readonly xl6Auto?: boolean | number;
  /** Añade col-8xl-N; la disponibilidad del breakpoint depende del CSS. */
  readonly xl8?: number;
  /** Añade col-8xl-auto; conserva compatibilidad con valores numéricos. */
  readonly xl8Auto?: boolean | number;
  /** Añade col-auto sin retirar las otras clases de ancho. */
  readonly auto?: boolean;
  /** Añade offset-N. 0 no añade desplazamiento. */
  readonly offset?: number;
  /** Añade la clase heredada offset-xs-N. */
  readonly offsetXs?: number;
  /** Añade offset-sm-N. */
  readonly offsetSm?: number;
  /** Añade offset-md-N. */
  readonly offsetMd?: number;
  /** Añade offset-lg-N. */
  readonly offsetLg?: number;
  /** Añade offset-xl-N. */
  readonly offsetXl?: number;
  /** Añade offset-2xl-N, sujeto al CSS del breakpoint. */
  readonly offsetXl2?: number;
  /** Añade offset-3xl-N, sujeto al CSS del breakpoint. */
  readonly offsetXl3?: number;
  /** Añade offset-4xl-N, sujeto al CSS del breakpoint. */
  readonly offsetXl4?: number;
  /** Añade offset-6xl-N, sujeto al CSS del breakpoint. */
  readonly offsetXl6?: number;
  /** Añade offset-8xl-N, sujeto al CSS del breakpoint. */
  readonly offsetXl8?: number;
  /** Omite solo la clase base col; conserva anchos, auto, offsets y className. */
  readonly ignoreCol?: boolean;
};

function GridCol({
  className,
  children,
  width = 0,
  xs = 0,
  sm = 0,
  md = 0,
  lg = 0,
  xl = 0,
  xl2 = 0,
  xl3 = 0,
  xl4 = 0,
  xl6 = 0,
  xl8 = 0,
  xsAuto,
  smAuto,
  mdAuto,
  lgAuto,
  xlAuto,
  xl2Auto,
  xl3Auto,
  xl4Auto,
  xl6Auto,
  xl8Auto,
  auto,
  offset = 0,
  offsetXs = 0,
  offsetSm = 0,
  offsetMd = 0,
  offsetLg = 0,
  offsetXl = 0,
  offsetXl2 = 0,
  offsetXl3 = 0,
  offsetXl4 = 0,
  offsetXl6 = 0,
  offsetXl8 = 0,
  ignoreCol = false,
}: GridColProps): React.ReactElement {
  const classes = cn(
    {
      col: !ignoreCol,
      [`col-${width}`]: width,
      [`col-xs-${xs}`]: xs,
      [`col-xs-auto`]: xsAuto,
      [`col-sm-${sm}`]: sm,
      [`col-sm-auto`]: smAuto,
      [`col-md-${md}`]: md,
      [`col-md-auto`]: mdAuto,
      [`col-lg-${lg}`]: lg,
      [`col-lg-auto`]: lgAuto,
      [`col-xl-${xl}`]: xl,
      [`col-xl-auto`]: xlAuto,
      [`col-2xl-${xl2}`]: xl2,
      [`col-2xl-auto`]: xl2Auto,
      [`col-3xl-${xl3}`]: xl3,
      [`col-3xl-auto`]: xl3Auto,
      [`col-4xl-${xl4}`]: xl4,
      [`col-4xl-auto`]: xl4Auto,
      [`col-6xl-${xl6}`]: xl6,
      [`col-6xl-auto`]: xl6Auto,
      [`col-8xl-${xl8}`]: xl8,
      [`col-8xl-auto`]: xl8Auto,
      "col-auto": auto,
      [`offset-${offset}`]: offset,
      [`offset-xs-${offsetXs}`]: offsetXs,
      [`offset-sm-${offsetSm}`]: offsetSm,
      [`offset-md-${offsetMd}`]: offsetMd,
      [`offset-lg-${offsetLg}`]: offsetLg,
      [`offset-xl-${offsetXl}`]: offsetXl,
      [`offset-2xl-${offsetXl2}`]: offsetXl2,
      [`offset-3xl-${offsetXl3}`]: offsetXl3,
      [`offset-4xl-${offsetXl4}`]: offsetXl4,
      [`offset-6xl-${offsetXl6}`]: offsetXl6,
      [`offset-8xl-${offsetXl8}`]: offsetXl8,
    },
    className
  )
  return <div className={classes}>{children}</div>
}

GridCol.displayName = "Grid.Col"

/** @component */
export default GridCol
