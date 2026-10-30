import SafeLink from "../../helpers/SafeLink.react";
import * as React from "react";
import cn from "classnames";
import Icon from "../Icon";

export type TagAddOnCommonProps = {
  readonly children?: React.ReactNode;
  readonly className?: string;
  readonly icon?: string;
  readonly color?: string;
  readonly onClick?: React.MouseEventHandler<HTMLElement>;
  readonly onMouseEnter?: React.MouseEventHandler<HTMLElement>;
  readonly onMouseLeave?: React.MouseEventHandler<HTMLElement>;
  readonly onPointerEnter?: React.PointerEventHandler<HTMLElement>;
  readonly onPointerLeave?: React.PointerEventHandler<HTMLElement>;
  readonly onFocus?: React.FocusEventHandler<HTMLElement>;
  readonly onBlur?: React.FocusEventHandler<HTMLElement>;
};
export type TagAddOnProps = TagAddOnCommonProps & (
  | { readonly link?: false; readonly href?: never; readonly RootComponent?: never; readonly to?: never }
  | { readonly link: true; readonly href?: string; readonly RootComponent?: never; readonly to?: never }
  | { readonly RootComponent: React.ElementType; readonly to: string; readonly link?: false; readonly href?: never }
);

function TagAddOn(props: TagAddOnProps): React.ReactElement {
  const {
    children,
    className,
    icon,
    color = "",
    onClick,
    onMouseEnter,
    onMouseLeave,
    onPointerEnter,
    onPointerLeave,
    onFocus,
    onBlur,
  } = props;

  const classes = cn("tag-addon", { [`tag-${color}`]: color }, className);

  const eventProps = {
    onClick,
    onMouseEnter,
    onMouseLeave,
    onPointerEnter,
    onPointerLeave,
    onFocus,
    onBlur,
  };

  const childrenForAll = (
    <React.Fragment>
      {icon && <Icon name={icon} />}
      {children}
    </React.Fragment>
  );

  if (props.link) {
    const { href } = props;
    return (
      <SafeLink className={classes} href={href} {...eventProps}>
        {childrenForAll}
      </SafeLink>
    );
  }

  if (props.RootComponent) {
    const { RootComponent: Component, to } = props;
    return (
      <SafeLink RootComponent={Component} to={to} {...eventProps}>
        {childrenForAll}
      </SafeLink>
    );
  }

  return (
    <span className={classes} {...eventProps}>
      {childrenForAll}
    </span>
  );
}

TagAddOn.displayName = "Tag.AddOn";

export default TagAddOn;
