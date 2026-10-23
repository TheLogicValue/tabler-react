import * as React from "react";
import cn from "classnames";

import Icon from "../Icon";

export type GalleryCardIconItemProps = {
  readonly className?: string;
  readonly label?: string;
  readonly name: string;
  readonly href?: string;
  readonly right?: boolean;
  readonly to?: string;
  readonly RootComponent?: React.ElementType;
};

function GalleryCardIconItem({
  className,
  label,
  name,
  href,
  right,
  to,
  RootComponent,
}: GalleryCardIconItemProps): React.ReactElement {
  const positionRightClasses = "d-none d-md-inline-block ml-3";
  const componentClasses = !right
    ? cn("icon", className)
    : cn("icon", positionRightClasses, className);

  const iconClasses = cn("mr-1");

  const childrenForAll = (
    <React.Fragment>
      <Icon name={name} className={iconClasses} />
      {label}
    </React.Fragment>
  );

  const extraProps: { href?: string } = {};

  if (href) {
    extraProps.href = href;
  }

  return RootComponent ? (
    <RootComponent className={componentClasses} to={to}>
      {childrenForAll}
    </RootComponent>
  ) : (
    <a className={componentClasses} {...extraProps}>
      {childrenForAll}
    </a>
  );
}

GalleryCardIconItem.displayName = "GalleryCard.IconItem";

/** @component */
export default GalleryCardIconItem;
