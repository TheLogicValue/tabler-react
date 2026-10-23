import * as React from "react";
import cn from "classnames";

export type GalleryCardIconGroupProps = {
  readonly children?: React.ReactNode;
  readonly className?: string;
};

function GalleryCardIconGroup({ children, className }: GalleryCardIconGroupProps): React.ReactElement {
  const classes = cn("ml-auto", "text-muted", className);

  return <div className={classes}>{children}</div>;
}

GalleryCardIconGroup.displayName = "GalleryCard.IconGroup";

export default GalleryCardIconGroup;
