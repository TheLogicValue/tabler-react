import * as React from "react";
import cn from "classnames";
import TagList from "./TagList.react";
import TagAddOn from "./TagAddOn.react";

export type TagCommonProps<T extends HTMLElement = HTMLElement> = {
  readonly rootRef?: React.Ref<T>;
  readonly "aria-describedby"?: string;
  readonly children?: React.ReactNode;
  readonly className?: string;
  readonly rounded?: boolean;
  readonly color?: string;
  readonly avatar?: string;
  readonly remove?: boolean;
  readonly onRemoveClick?: React.MouseEventHandler<HTMLElement>;
  readonly addOn?: React.ReactNode;
  readonly addOnIcon?: string;
  readonly addOnColor?: string;
  readonly onAddOnClick?: React.MouseEventHandler<HTMLElement>;
  readonly onClick?: React.MouseEventHandler<T>;
  readonly onMouseEnter?: React.MouseEventHandler<T>;
  readonly onMouseLeave?: React.MouseEventHandler<T>;
  readonly onPointerEnter?: React.PointerEventHandler<T>;
  readonly onPointerLeave?: React.PointerEventHandler<T>;
  readonly onFocus?: React.FocusEventHandler<T>;
  readonly onBlur?: React.FocusEventHandler<T>;
};

export type TagSpanProps = TagCommonProps<HTMLSpanElement> & {
  readonly link?: false;
  readonly href?: never;
  readonly RootComponent?: never;
  readonly to?: never;
};
export type TagAnchorProps = TagCommonProps<HTMLAnchorElement> & {
  readonly link: true;
  readonly href: string;
  readonly RootComponent?: never;
  readonly to?: never;
};
export type TagCustomProps = TagCommonProps & {
  readonly RootComponent: React.ElementType;
  readonly to: string;
  readonly link?: boolean;
  readonly href?: never;
};
export type TagProps = TagSpanProps | TagAnchorProps | TagCustomProps;

type TagState = { isDeleted: boolean };

function eventProps<T extends HTMLElement>(props: TagCommonProps<T>) {
  return {
    ref: props.rootRef,
    "aria-describedby": props["aria-describedby"],
    onClick: props.onClick,
    onMouseEnter: props.onMouseEnter,
    onMouseLeave: props.onMouseLeave,
    onPointerEnter: props.onPointerEnter,
    onPointerLeave: props.onPointerLeave,
    onFocus: props.onFocus,
    onBlur: props.onBlur,
  };
}

class Tag extends React.Component<TagProps, TagState> {
  state = {
    isDeleted: false,
  };

  static List = TagList;
  static AddOn = TagAddOn;

  handleOnRemoveClick = (): void => {
    this.setState(s => ({
      isDeleted: true,
    }));
  };

  render(): React.ReactElement | null {
    const {
      children,
      className,
      rounded,
      color = "",
      avatar,
      remove,
      addOn,
      addOnIcon,
      addOnColor,
      onRemoveClick,
      onAddOnClick,
    } = this.props;

    const classes = cn(
      {
        tag: true,
        expanded: true,
        "tag-rounded": rounded,
        [`tag-${color}`]: color,
      },
      className
    );

    if (this.state.isDeleted) {
      return null;
    }

    const childrenForAll = (
      <React.Fragment>
        {avatar && (
          <span
            className="tag-avatar avatar"
            style={{ backgroundImage: `url(${avatar})` }}
          />
        )}
        {children}
        {(addOn || addOnIcon) && (
          <TagAddOn icon={addOnIcon} color={addOnColor} onClick={onAddOnClick}>
            {addOn}
          </TagAddOn>
        )}
        {remove && onRemoveClick ? (
          <TagAddOn onClick={onRemoveClick} link icon="x" />
        ) : (
          remove && (
            <TagAddOn onClick={this.handleOnRemoveClick} link icon="x" />
          )
        )}
      </React.Fragment>
    );

    if (this.props.RootComponent) {
      const { RootComponent: Component, to } = this.props;
      return (
        <Component className={classes} to={to} {...eventProps(this.props)}>
          {childrenForAll}
        </Component>
      );
    }

    if (this.props.link) {
      const { href } = this.props;
      return (
        <a className={classes} href={href} {...eventProps(this.props)}>
          {childrenForAll}
        </a>
      );
    }

    return (
      <span className={classes} {...eventProps(this.props)}>
        {childrenForAll}
      </span>
    );
  }
}

export default Tag;
