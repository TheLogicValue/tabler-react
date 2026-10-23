import * as React from "react";
import cn from "classnames";

export type IconProps = {
  readonly className?: string;
  /**
   * Should this icon be rendered within an <a> tag
   */
  readonly link?: boolean;
  /**
   * The icon prefix
   */
  readonly prefix?: string;
  /**
   * The icon name
   */
  readonly name: string;
  readonly title?: string;
  readonly isAriaHidden?: boolean;
  /**
   * Use the built-in payment icon set
   */
  readonly payment?: boolean;
  /**
   * Use the built-in flag icon set
   */
  readonly flag?: boolean;
  /**
   * Icon color (primary | secondary | tertiary)
   */
  readonly color?: string;
  /**
   * Icon size (large | medium | big)
   */
  readonly size?: string;
  /** Events are attached to the outer i or a element, depending on link. */
  readonly onClick?: React.MouseEventHandler<HTMLElement>;
  readonly onMouseEnter?: React.MouseEventHandler<HTMLElement>;
  readonly onMouseLeave?: React.MouseEventHandler<HTMLElement>;
  readonly onPointerEnter?: React.PointerEventHandler<HTMLElement>;
  readonly onPointerLeave?: React.PointerEventHandler<HTMLElement>;
  readonly onFocus?: React.FocusEventHandler<HTMLElement>;
  readonly onBlur?: React.FocusEventHandler<HTMLElement>;
};

/**
 * Display an icon.
 * Uses the included feathers icon set by default but you can add your own
 */
function Icon({
  prefix: prefixFromProps = "fe",
  name,
  title,
  className,
  link,
  isAriaHidden,
  payment,
  flag,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onPointerEnter,
  onPointerLeave,
  onFocus,
  onBlur,
  color,
  size
}: IconProps): React.ReactElement {
  const prefix = (payment && "payment") || (flag && "flag") || prefixFromProps;
  const isColor = color;
  const isSize = size;
  const classes = cn(
    {
      [prefix]: true,
      [`${prefix}-${name}`]: true,
      ["color-"+color]: isColor,
      ["icon-size-" + size]: isSize,
    },
    className
  );

  const extraProps = isAriaHidden
    ? {
        "aria-hidden": "true" as const,
      }
    : null;

  const eventProps = {
    onClick,
    onMouseEnter,
    onMouseLeave,
    onPointerEnter,
    onPointerLeave,
    onFocus,
    onBlur,
  };

  return !link ? (
    <i className={classes} {...eventProps} title={title}/>
  ) : (
    <a className="icon" {...extraProps} {...eventProps} title={title}>
      <i className={classes} />
    </a>
  );
}

Icon.displayName = "Icon";

/** @component */
export default Icon;
