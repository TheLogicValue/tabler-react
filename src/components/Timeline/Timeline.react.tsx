import * as React from "react";
import cn from "classnames";

import TimelineItem from "./TimelineItem.react";
import TimelineItemTime from "./TimelineItemTime.react";
import TimelineItemBadge from "./TimelineItemBadge.react";
import TimelineItemTitle from "./TimelineItemTitle.react";
import TimelineItemDescription from "./TimelineItemDescription.react";

export type TimelineProps = {
  readonly children?: React.ReactNode;
  readonly className?: string;
};

function Timeline({ className, children }: TimelineProps): React.ReactElement {
  const classes = cn(
    {
      timeline: true,
    },
    className
  );
  return <ul className={classes}>{children}</ul>;
}

Timeline.Item = TimelineItem;
Timeline.ItemTime = TimelineItemTime;
Timeline.ItemBadge = TimelineItemBadge;
Timeline.ItemTitle = TimelineItemTitle;
Timeline.ItemDescription = TimelineItemDescription;

export default Timeline;
