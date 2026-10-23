import * as React from "react";

export type PageMainProps = {
  readonly children?: React.ReactNode;
};

function PageMain({ children }: PageMainProps): React.ReactElement {
  return <div className={"page-main"}>{children}</div>;
}

PageMain.displayName = "Page.Main";

export default PageMain;
