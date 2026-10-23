import * as React from "react";
import cn from "classnames";

export type PageTitleProps = {
  readonly children?: React.ReactNode;
  readonly className?: string;
};

function PageTitle({ className, children }: PageTitleProps): React.ReactElement {
  const classes = cn("page-title", className);
  return <h1 className={classes}>{children}</h1>;
}

PageTitle.displayName = "Page.Title";

export default PageTitle;
