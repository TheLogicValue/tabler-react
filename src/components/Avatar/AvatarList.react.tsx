import * as React from "react";
import cn from "classnames";

export type AvatarListProps = {
  readonly children?: React.ReactNode;
  readonly className?: string;
  /**
   * Renders the Avatars to look stacked by slightly overlapping each over
   */
  readonly stacked?: boolean;
};

/**
 * Renders a group of Icons
 */
function AvatarList({ className, children, stacked }: AvatarListProps): React.ReactElement {
  const classes = cn(
    {
      "avatar-list": true,
      "avatar-list-stacked": stacked,
    },
    className
  );
  return <div className={classes}>{children}</div>;
}

AvatarList.displayName = "Avatar.List";

export default AvatarList;
