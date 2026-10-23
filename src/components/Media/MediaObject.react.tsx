import * as React from "react";
import cn from "classnames";

import Avatar from "../Avatar";

export type MediaObjectProps = {
  readonly children?: React.ReactNode;
  readonly className?: string;
  readonly avatar?: boolean;
  readonly objectURL?: string;
  readonly size?: "sm" | "md" | "lg" | "xl" | "xxl";
  readonly rounded?: boolean;
  readonly alt?: string;
};

function MediaObject({
  className,
  children,
  avatar,
  objectURL,
  size,
  rounded,
  alt,
}: MediaObjectProps): React.ReactElement {
  const classes = cn("media-object", className);
  const imageClasses = cn({ "d-flex": true, rounded });

  const mediaImage = avatar ? (
    <Avatar size={size} imageURL={objectURL} />
  ) : objectURL ? (
    <img className={imageClasses} src={objectURL} alt={alt} />
  ) : null;

  return (
    <div className={classes}>
      {mediaImage}
      {children}
    </div>
  );
}

export default MediaObject;
