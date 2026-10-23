import * as React from "react";
import Grid, { type GridProps, type GridRowProps, type GridColProps } from "../../src/components/Grid";

const grid: GridProps = { children: "Contenido" };
const row: GridRowProps = { cards: true, gutters: "sm", alignItems: "center", justifyContent: "between" };
const col: GridColProps = { width: 12, sm: 6, lg: 4, offsetMd: 1, xl2Auto: 1, xl8Auto: true };
<Grid {...grid} />;
<Grid>{null}</Grid>;
<Grid><Grid.Row {...row}><Grid.Col {...col}>Columna</Grid.Col></Grid.Row></Grid>;
<Grid.Row gutters="" alignItems="consumer-alignment" justifyContent="consumer-justification" />;
<Grid.Col ignoreCol auto xs={2} xl2={3} xl3={4} xl4={6} xl6={8} xl8={12} offsetXl8={1} />;
<Grid.Col xsAuto smAuto mdAuto lgAuto xlAuto xl2Auto xl3Auto={0} xl4Auto={1} xl6Auto={false} xl8Auto />;

// @ts-expect-error Grid requires a children prop even when the value is null.
<Grid />;
// @ts-expect-error widths are numeric, not CSS strings.
<Grid.Col width="6" />;
// @ts-expect-error responsive widths remain numeric.
<Grid.Col lg="6" />;
// @ts-expect-error offsets are numeric.
<Grid.Col offsetMd="1" />;
// @ts-expect-error auto flags do not accept string booleans.
<Grid.Col xl2Auto="true" />;
// @ts-expect-error gutters only supports the existing size variants or empty.
<Grid.Row gutters="wide" />;
// @ts-expect-error cards is a boolean, not a CSS string.
<Grid.Row cards="true" />;
// @ts-expect-error row does not forward arbitrary DOM event props.
<Grid.Row onClick={() => undefined} />;
// @ts-expect-error col does not forward arbitrary DOM event props.
<Grid.Col onClick={() => undefined} />;
