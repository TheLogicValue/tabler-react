// @flow

import * as React from "react";
import { Icon } from "..";
import cn from "classnames";
import AvatarList from "./AvatarList";

//import type { MouseEvents, PointerEvents } from "../..";

interface Props {
  onClick?: (event: React.MouseEvent) => void;
  onMouseEnter?: (event: React.MouseEvent) => void;
  onMouseLeave?: (event: React.MouseEvent) => void;
  onPointerEnter?: (event: React.SyntheticEvent) => void;
  onPointerLeave?: (event: React.SyntheticEvent) => void;
  children?: React.ReactNode;
  className?: string;
  imageURL?: string;
  style?: Object;
  size?: "" | "sm" | "md" | "lg" | "xl" | "xxl";
  status?: "grey" | "red" | "yellow" | "green";
  placeholder?: boolean;
  icon?: string;
  color?: string;
}

/**
 * Renders a single circular avatar
 */

const Avatar = ({
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
}: Props) => {
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
};

Avatar.List = AvatarList;

export default Avatar;
