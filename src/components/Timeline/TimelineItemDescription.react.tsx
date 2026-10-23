import * as React from "react";

export type TimelineItemDescriptionProps = {
  readonly children?: React.ReactNode;
};

function TimelineItemDescription({ children }: TimelineItemDescriptionProps): React.ReactElement {
  return <small className="d-block text-muted">{children}</small>;
}

TimelineItemDescription.displayName = "Timeline.ItemDescription";

export default TimelineItemDescription;
