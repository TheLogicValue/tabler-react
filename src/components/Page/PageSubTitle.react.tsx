import * as React from "react";

export type PageSubTitleProps = {
  readonly children?: React.ReactNode;
};

function PageSubTitle({ children }: PageSubTitleProps): React.ReactElement {
  return <div className="page-subtitle">{children}</div>;
}

PageSubTitle.displayName = "Page.SubTitle";

export default PageSubTitle;
