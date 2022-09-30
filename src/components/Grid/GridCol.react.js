// @flow

import * as React from "react"
import cn from "classnames"

type Props = {
  children?: React.ReactNode,
  className?: string,
  width?: number,
  xs?: number,
  xsAuto?: boolean,
  sm?: number,
  smAuto?: boolean,
  md?: number,
  mdAuto?: boolean,
  lg?: number,
  lgAuto?: boolean,
  xl?: number,
  xlAuto?: boolean,
  xl2?: number,
  xl2Auto?: number,
  xl3?: number,
  xl3Auto?: number,
  xl4?: number,
  xl4Auto?: number,
  xl6?: number,
  xl6Auto?: number,
  xl8?: number,
  xl8Auto?: number,
  auto?: boolean,
  offset?: number,
  offsetXs?: number,
  offsetSm?: number,
  offsetMd?: number,
  offsetLg?: number,
  offsetXl?: number,
  offsetXl2?: number,
  offsetXl3?: number,
  offsetXl4?: number,
  offsetXl6?: number,
  offsetXl8?: number,
  ignoreCol?: boolean,
}

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
}: Props): React.ReactNode {
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
      [`col-xl-${xl2}`]: xl2,
      [`col-2xl-auto`]: xl2Auto,
      [`col-xl-${xl3}`]: xl3,
      [`col-3xl-auto`]: xl3Auto,
      [`col-xl-${xl4}`]: xl4,
      [`col-4xl-auto`]: xl4Auto,
      [`col-xl-${xl6}`]: xl6,
      [`col-6xl-auto`]: xl6Auto,
      [`col-xl-${xl8}`]: xl8,
      [`col-8xl-auto`]: xl8Auto,
      "col-auto": auto,
      [`offset-${offset}`]: offset,
      [`offset-xs-${offsetXs}`]: offsetXs,
      [`offset-sm-${offsetSm}`]: offsetSm,
      [`offset-md-${offsetMd}`]: offsetMd,
      [`offset-lg-${offsetLg}`]: offsetLg,
      [`offset-xl-${offsetXl}`]: offsetXl,
      [`offset-xl-${offsetXl2}`]: offsetXl2,
      [`offset-xl-${offsetXl3}`]: offsetXl3,
      [`offset-xl-${offsetXl4}`]: offsetXl4,
      [`offset-xl-${offsetXl6}`]: offsetXl6,
      [`offset-xl-${offsetXl8}`]: offsetXl8,
    },
    className
  )
  return <div className={classes}>{children}</div>
}

GridCol.displayName = "Grid.Col"

/** @component */
export default GridCol