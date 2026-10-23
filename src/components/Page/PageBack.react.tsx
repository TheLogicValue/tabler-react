import * as React from "react";
import cn from "classnames";

export type PageBackProps = {
  readonly children?: React.ReactNode;
  readonly className?: string;
};

export default function PageBack({ className, children }: PageBackProps): React.ReactElement {
  const classes = cn("page-back", className);
  return <span className={classes}>{children}</span>;
}
PageBack.displayName = "Page.Back";
