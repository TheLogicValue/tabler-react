import * as React from "react";

import DefaultErrorPage from "./DefaultErrorPage.react";
import type { DefaultErrorPageProps } from "./DefaultErrorPage.react";

export type Error400PageProps = DefaultErrorPageProps;

function Error400Page({
  title = "400",
  subtitle = "Oops... You just found an error page...",
  details = "We are sorry but your request contains bad syntax and cannot be fulfilled...",
  action,
}: Error400PageProps): React.ReactElement {
  return (
    <DefaultErrorPage
      title={title}
      subtitle={subtitle}
      details={details}
      action={action}
    />
  );
}

export default Error400Page;
