import * as React from "react";

export type PageMapHeaderProps = {
  readonly children?: React.ReactNode;
};

function PageMapHeader({ children }: PageMapHeaderProps): React.ReactElement {
  return <div className="map-header">{children}</div>;
}

PageMapHeader.displayName = "Page.MapHeader";

export default PageMapHeader;
