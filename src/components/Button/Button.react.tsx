import * as React from "react";
import cn from "classnames";
import Icon from "../Icon";
import ButtonList from "./ButtonList.react";
import ButtonDropdown from "./ButtonDropdown.react";

export type ButtonCommonProps<T extends HTMLElement = HTMLElement> = {
  readonly "aria-label"?: React.AriaAttributes["aria-label"];
  readonly "aria-describedby"?: React.AriaAttributes["aria-describedby"];
  readonly "aria-expanded"?: React.AriaAttributes["aria-expanded"];
  readonly "aria-haspopup"?: React.AriaAttributes["aria-haspopup"];
  readonly size?: "" | "sm" | "lg";
  readonly outline?: boolean;
  readonly link?: boolean;
  readonly block?: boolean;
  readonly className?: string;
  readonly children?: React.ReactNode;
  readonly disabled?: boolean;
  readonly color?: string;
  readonly square?: boolean;
  readonly pill?: boolean;
  readonly icon?: string;
  readonly social?: string;
  readonly loading?: boolean;
  readonly tabIndex?: number;
  readonly isDropdownToggle?: boolean;
  readonly to?: string;
  readonly isOption?: boolean;
  readonly rootRef?: React.Ref<T>;
  readonly onClick?: React.MouseEventHandler<T>;
  readonly onMouseEnter?: React.MouseEventHandler<T>;
  readonly onMouseLeave?: React.MouseEventHandler<T>;
  readonly onPointerEnter?: React.PointerEventHandler<T>;
  readonly onPointerLeave?: React.PointerEventHandler<T>;
  readonly onFocus?: React.FocusEventHandler<T>;
  readonly onBlur?: React.FocusEventHandler<T>;
};

export type ButtonNativeProps = ButtonCommonProps<HTMLButtonElement> & {
  readonly RootComponent?: "button";
  readonly type?: "button" | "submit" | "reset";
  readonly value?: string;
};
export type ButtonInputProps = ButtonCommonProps<HTMLInputElement> & {
  readonly RootComponent: "input";
  readonly type?: "button" | "submit" | "reset";
  readonly value?: string;
};
export type ButtonAnchorProps = ButtonCommonProps<HTMLAnchorElement> & {
  readonly RootComponent: "a";
  readonly type?: never;
  readonly href?: string;
  readonly target?: string;
  readonly rel?: string;
  readonly download?: string;
};
export type ButtonCustomProps = ButtonCommonProps & {
  readonly RootComponent: Exclude<React.ElementType, "button" | "input" | "a">;
  readonly type?: never;
};
export type ButtonProps = ButtonNativeProps | ButtonAnchorProps | ButtonInputProps | ButtonCustomProps;
// Retain the short source type alias for internal imports.
export type Props = ButtonProps;

type ButtonForwardedProps = Pick<ButtonCommonProps, "aria-label" | "disabled" | "onClick" | "onMouseEnter" | "onMouseLeave" | "onPointerEnter" | "onPointerLeave" | "tabIndex" | "onFocus" | "onBlur" | "aria-describedby" | "aria-expanded" | "aria-haspopup"> & { className: string };

const Button = (props: ButtonProps): React.ReactElement => {
  const {
    size = "",
    outline,
    link,
    block,
    className,
    children,
    disabled,
    color = "",
    square,
    pill,
    icon,
    social = "",
    loading,
    tabIndex,
    isDropdownToggle,
    isOption,
    rootRef,
    to,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onPointerEnter,
    onPointerLeave,
    onFocus,
    onBlur,
  } = props;

  const classes = cn(
    {
      btn: true,
      [`btn-${size}`]: !!size,
      [`btn-block`]: block,
      [`btn-outline-${color}`]: outline && !!color,
      [`btn-link`]: link,
      disabled: disabled,
      [`btn-${color}`]: !!color && !outline,
      [`btn-${social}`]: !!social,
      "btn-square": square,
      "btn-pill": pill,
      "btn-icon": !children,
      "btn-loading": loading,
      "dropdown-toggle": isDropdownToggle,
      "btn-option": isOption,
    },
    className
  );

  const propsForAll: ButtonForwardedProps = {
    className: classes,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: onMouseEnter,
    onMouseLeave: onMouseLeave,
    onPointerEnter: onPointerEnter,
    onPointerLeave: onPointerLeave,
    tabIndex: tabIndex,
    onFocus,
    onBlur,
    "aria-label": props["aria-label"],
    "aria-describedby": props["aria-describedby"],
    "aria-expanded": props["aria-expanded"],
    "aria-haspopup": props["aria-haspopup"],
  };

  const childrenForAll = (
    <React.Fragment>
      {social ? (
        <Icon name={social} prefix="fa" className={children ? "mr-2" : ""} />
      ) : icon ? (
        <Icon name={icon} className={children ? "mr-2" : ""} />
      ) : null}
      {children}
    </React.Fragment>
  );

  if (!props.RootComponent || props.RootComponent === "button") {
    const { type, value } = props;
    return (
      <button {...propsForAll} type={type} value={value} ref={rootRef as React.Ref<HTMLButtonElement>}>
        {childrenForAll}
      </button>
    );
  } else if (props.RootComponent === "input") {
    const { type, value } = props;
    return <input {...propsForAll} type={type} value={value} ref={rootRef as React.Ref<HTMLInputElement>} />;
  } else if (props.RootComponent === "a") {
    const { href, target, rel, download } = props;
    return (
      <a {...propsForAll} href={href} target={target} ref={rootRef as React.Ref<HTMLAnchorElement>} rel={rel} download={download}>
        {childrenForAll}
      </a>
    );
  } else {
    const Component: React.ElementType = props.RootComponent;
    return (
      <Component {...propsForAll} to={to}>
        {childrenForAll}
      </Component>
    );
  }
};

Button.List = ButtonList;
Button.Dropdown = ButtonDropdown;

Button.displayName = "Button";

export default Button;
