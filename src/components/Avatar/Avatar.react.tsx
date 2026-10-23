import * as React from "react";
import Icon from "../Icon";
import cn from "classnames";
import AvatarList from "./AvatarList.react";


export type AvatarProps = {
  readonly children?: React.ReactNode;
  readonly className?: string;
  /**
   * The URL of the image to be displayed
   */
  readonly imageURL?: string;
  readonly style?: React.CSSProperties;
  readonly size?: "" | "sm" | "md" | "lg" | "xl" | "xxl";
  /**
   * Display a colored status dot with the avatar
   */
  readonly status?: "grey" | "red" | "yellow" | "green";
  /**
   * Displays the user icon as a placeholder
   */
  readonly placeholder?: boolean;
  /**
   * Render an icon instead of an imageURL
   */
  readonly icon?: string;
  /**
   * The background and font color of the circle
   */
  readonly color?: string;
  readonly onClick?: React.MouseEventHandler<HTMLSpanElement>;
  readonly onMouseEnter?: React.MouseEventHandler<HTMLSpanElement>;
  readonly onMouseLeave?: React.MouseEventHandler<HTMLSpanElement>;
  readonly onPointerEnter?: React.PointerEventHandler<HTMLSpanElement>;
  readonly onPointerLeave?: React.PointerEventHandler<HTMLSpanElement>;
};

/**
 * Renders a single circular avatar
 */
function Avatar({
  className,
  children,
  imageURL,
  style,
  size = "",
  status,
  placeholder,
  icon,
  color = "",
  onClick,
  onMouseEnter,
  onMouseLeave,
  onPointerEnter,
  onPointerLeave,
}: AvatarProps): React.ReactElement {
  const classes = cn(
    {
      avatar: true,
      [`avatar-${size}`]: !!size,
      "avatar-placeholder": placeholder,
      [`avatar-${color}`]: !!color,
    },
    className
  );
  return (
    <span
      className={classes}
      style={
        imageURL
          ? Object.assign(
              {
                backgroundImage: `url(${imageURL})`,
              },
              style
            )
          : style
      }
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
    >
      {icon && <Icon name={icon} />}
      {status && <span className={`avatar-status bg-${status}`} />}
      {children}
    </span>
  );
}

Avatar.List = AvatarList;

export default Avatar;

// Retain the source type name used by pending Flow components.
export type Props = AvatarProps;
