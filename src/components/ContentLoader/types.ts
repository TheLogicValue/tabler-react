import type { IContentLoaderProps } from "react-content-loader";

export type ContentLoaderProps = IContentLoaderProps & {
  readonly width?: IContentLoaderProps["width"];
  readonly height?: IContentLoaderProps["height"];
  readonly title?: string;
  readonly uniqueKey?: string;
  readonly animate?: boolean;
  readonly speed?: number;
  readonly backgroundColor?: string;
  readonly foregroundColor?: string;
  readonly backgroundOpacity?: number;
  readonly foregroundOpacity?: number;
  readonly viewBox?: string;
};
