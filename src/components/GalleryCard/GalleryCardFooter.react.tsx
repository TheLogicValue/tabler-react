import * as React from "react";
import cn from "classnames";

export type GalleryCardFooterProps = {
  readonly children?: React.ReactNode;
};

function GalleryCardFooter({ children }: GalleryCardFooterProps): React.ReactElement {
  const classes = cn("d-flex", "align-items-center", "px-2");

  return <div className={classes}>{children}</div>;
}

GalleryCardFooter.displayName = "GalleryCard.Footer";

export default GalleryCardFooter;
