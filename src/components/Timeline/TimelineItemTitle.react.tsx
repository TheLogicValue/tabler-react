import * as React from "react";

export type TimelineItemTitleProps = {
  readonly children?: React.ReactNode;
  readonly active?: boolean;
};

function TimelineItemTitle({ children, active }: TimelineItemTitleProps): React.ReactNode {
  if (children) {
    return active ? <strong>{children}</strong> : children;
  } else {
    return null;
  }
}

TimelineItemTitle.displayName = "Timeline.ItemTitle";

export default TimelineItemTitle;
