import * as React from "react";
import cn from "classnames";

export type TimelineItemBadgeProps = {
  readonly children?: React.ReactNode;
  readonly className?: string;
  readonly color?: string;
};

function TimelineItemBadge({
  className,
  children,
  color = "",
}: TimelineItemBadgeProps): React.ReactElement {
  const classes = cn(
    {
      "timeline-badge": true,
      [`bg-${color}`]: color,
    },
    className
  );
  return <div className={classes}>{children}</div>;
}

TimelineItemBadge.displayName = "Timeline.ItemBadge";

export default TimelineItemBadge;
