import * as React from "react";
import cn from "classnames";

export type TimelineItemTimeProps = {
  readonly children?: React.ReactNode;
  readonly className?: string;
  readonly active?: boolean;
};

function TimelineItemTime({ className, children, active }: TimelineItemTimeProps): React.ReactElement {
  const classes = cn(
    {
      "timeline-time": true,
      "text-muted-black": active,
    },
    className
  );
  return <div className={classes}>{children}</div>;
}

TimelineItemTime.displayName = "Timeline.ItemTime";

export default TimelineItemTime;
