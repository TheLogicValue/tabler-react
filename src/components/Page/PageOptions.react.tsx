import * as React from "react";

export type PageOptionsProps = {
  readonly children?: React.ReactNode;
};

function PageOptions({ children }: PageOptionsProps): React.ReactElement {
  return <div className="page-options d-flex">{children}</div>;
}

PageOptions.displayName = "Page.Options";

export default PageOptions;
