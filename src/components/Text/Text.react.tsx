import * as React from "react";
import cn from "classnames";
import TextSmall from "./TextSmall.react";

type AlignProps = {
  readonly align?: "left" | "center" | "right" | "justify";
  readonly left?: boolean;
  readonly center?: boolean;
  readonly right?: boolean;
  readonly justify?: boolean;
};

type TransformProps = {
  readonly transform?: "lowercase" | "uppercase" | "capitalize";
  readonly lowercase?: boolean;
  readonly uppercase?: boolean;
  readonly capitalize?: boolean;
};

type TrackingProps = {
  readonly tracking?: "tight" | "normal" | "wide";
  readonly trackingTight?: boolean;
  readonly trackingNormal?: boolean;
  readonly trackingWide?: boolean;
};

type LeadingProps = {
  readonly leading?: "none" | "tight" | "normal" | "loose";
  readonly leadingNone?: boolean;
  readonly leadingTight?: boolean;
  readonly leadingNormal?: boolean;
  readonly leadingLoose?: boolean;
};

type TextOwnProps = AlignProps & TransformProps & TrackingProps & LeadingProps & {
  readonly children?: React.ReactNode;
  readonly className?: string;
  readonly color?: string;
  readonly size?: string;
  readonly wrap?: boolean;
  readonly muted?: boolean;
};

export type TextProps<C extends React.ElementType = "div"> = TextOwnProps & {
  readonly RootComponent?: C;
} & Omit<React.ComponentPropsWithoutRef<NoInfer<C>>, keyof TextOwnProps | "RootComponent">;

const Text = <C extends React.ElementType = "div">({
  className,
  children,
  RootComponent,
  color = "",
  size = "",
  wrap,
  muted,
  ...props
}: TextProps<C>): React.ReactElement => {
  const { align: alignFromProps, left, center, right, justify } = props;
  const align =
    alignFromProps ||
    (left && "left") ||
    (center && "center") ||
    (right && "right") ||
    (justify && "justify") ||
    "";

  const {
    transform: transformFromProps,
    lowercase,
    uppercase,
    capitalize,
  } = props;
  const transform =
    transformFromProps ||
    (lowercase && "lowercase") ||
    (uppercase && "uppercase") ||
    (capitalize && "capitalize") ||
    "";

  const {
    tracking: trackingFromProps,
    trackingTight,
    trackingNormal,
    trackingWide,
  } = props;
  const tracking =
    trackingFromProps ||
    (trackingTight && "tight") ||
    (trackingNormal && "normal") ||
    (trackingWide && "wide") ||
    "";

  const {
    leading: leadingFromProps,
    leadingNone,
    leadingTight,
    leadingNormal,
    leadingLoose,
  } = props;
  const leading =
    leadingFromProps ||
    (leadingNone && "none") ||
    (leadingTight && "tight") ||
    (leadingNormal && "normal") ||
    (leadingLoose && "loose") ||
    "";

  const classes = cn(
    {
      [`text-wrap p-lg-6`]: wrap,
      [`text-${color}`]: color,
      [`${size}`]: size,
      "text-muted": muted,
      [`text-${align}`]: align,
      [`text-${transform}`]: transform,
      [`tracking-${tracking}`]: tracking,
      [`leading-${leading}`]: leading,
    },
    className
  );
  const Component: React.ElementType = RootComponent || "div";
  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
};

Text.displayName = "Text";

Text.Small = TextSmall;

/** @component */
export default Text;
