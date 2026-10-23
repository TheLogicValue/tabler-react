import type * as React from "react";
import type {
  BarSeriesOption, Color, DefaultLabelFormatterCallbackParams, GridComponentOption,
  LineSeriesOption, PieSeriesOption, RadarComponentOption, RadarSeriesOption,
  TooltipComponentFormatterCallback, XAxisComponentOption,
} from "echarts";

export type ChartTooltipItem = DefaultLabelFormatterCallbackParams;
export type ChartTooltipResult = ReturnType<TooltipComponentFormatterCallback<ChartTooltipItem>>;
export type ChartTooltipFormatter<T = ChartTooltipItem> = (item: T) => ChartTooltipResult;
export type ChartAxisRange = { min: number; max: number };
export type ChartAxisMinMax = (range: ChartAxisRange, boundary: "min" | "max") => number | string | null | undefined;
export type ChartAxisFormatter = (value: number) => string;
export type ChartCategoryData = Extract<XAxisComponentOption, { type?: "category" }>["data"];

export type ChartCommonProps = {
  readonly title?: string;
  readonly height?: React.CSSProperties["height"];
  readonly paddingBottom?: React.CSSProperties["paddingBottom"] | null;
  readonly colors: Color[];
  readonly complete?: boolean;
  readonly downloadName?: string;
  readonly downloadTitle?: string;
  readonly download?: boolean;
};

export type BarChartData = NonNullable<BarSeriesOption["data"]>;
type BarOrientation =
  | { readonly type?: "vertical"; readonly yAxisFormatter: ChartAxisFormatter; readonly yAxisMinMax: ChartAxisMinMax; readonly xAxisFormatter?: ChartAxisFormatter; readonly xAxisMinMax?: ChartAxisMinMax }
  | { readonly type: "horizontal"; readonly xAxisFormatter: ChartAxisFormatter; readonly xAxisMinMax: ChartAxisMinMax; readonly yAxisFormatter?: ChartAxisFormatter; readonly yAxisMinMax?: ChartAxisMinMax };
type BarValues =
  | { readonly stack?: null | undefined; readonly series: BarChartData[]; readonly seriesName: string[] }
  | { readonly stack: string; readonly series: string[]; readonly seriesName: BarChartData[] };
export type BarChartProps = ChartCommonProps & BarOrientation & BarValues & {
  readonly legend?: boolean;
  readonly rotateX?: number;
  readonly tooltipFormatter: ChartTooltipFormatter;
  readonly xAxisData?: ChartCategoryData;
  readonly yAxisData?: ChartCategoryData;
  readonly decal?: boolean | null;
  readonly seriesShowBackground?: boolean;
  readonly backgroundStyleColor?: string;
};

export type ChartLine = {
  readonly name?: string;
  readonly data?: LineSeriesOption["data"];
  readonly color?: LineSeriesOption["color"];
};
export type LineChartProps = {
  readonly lines?: readonly ChartLine[];
  readonly height?: React.CSSProperties["height"];
  readonly selectedOptions?: string[];
  readonly getLegend?: Record<string, boolean>;
  readonly tooltipFormatter: ChartTooltipFormatter<ChartTooltipItem[]>;
  readonly xAxisData?: ChartCategoryData;
  readonly yAxisMinInterval?: number;
  readonly yAxisFormatter: ChartAxisFormatter;
  readonly yAxisMinMax: ChartAxisMinMax;
  readonly complete?: boolean;
  readonly name?: string;
  readonly title?: string;
  readonly top?: GridComponentOption["top"] | null;
  readonly right?: GridComponentOption["right"] | null;
  readonly left?: GridComponentOption["left"] | null;
  readonly bottom?: GridComponentOption["bottom"] | null;
  readonly download?: boolean;
  readonly onExpand?: (() => void) | null;
  readonly toolboxTop?: GridComponentOption["top"];
  readonly toolboxRight?: GridComponentOption["right"];
  readonly toolboxBottom?: GridComponentOption["bottom"];
};

export type PieChartProps = ChartCommonProps & {
  readonly legend?: boolean;
  /** Legacy option: PieChart ignores it; DoughnutChart applies it to labels. */
  readonly legendformatter?: NonNullable<PieSeriesOption["label"]>["formatter"];
  readonly series?: (number | "-")[];
  readonly seriesDataName: string[];
  readonly tooltipFormatter: ChartTooltipFormatter;
  readonly center?: PieSeriesOption["center"];
};
export type DoughnutChartProps = Omit<PieChartProps, "center">;
export type RadarValues = Extract<NonNullable<RadarSeriesOption["data"]>[number], unknown[]>;
export type RadarTooltipItem = Omit<ChartTooltipItem, "value"> & { value: RadarValues };
export type RadarChartProps = ChartCommonProps & {
  readonly series?: RadarValues[];
  readonly seriesDataName: string[];
  readonly indicator?: RadarComponentOption["indicator"];
  readonly tooltipFormatter: ChartTooltipFormatter<RadarTooltipItem>;
};
