import * as React from "react";

import DefaultErrorPage from "./DefaultErrorPage.react";
import type { DefaultErrorPageProps } from "./DefaultErrorPage.react";

export type Error503PageProps = DefaultErrorPageProps;

function Error503Page({
  title = "503",
  subtitle = "Oops... You just found an error page...",
  details = "This page is temporarily unavailable.  Please reload your browser...",
  action,
}: Error503PageProps): React.ReactElement {
  return (
    <DefaultErrorPage
      title={title}
      subtitle={subtitle}
      details={details}
      action={action}
    />
  );
}

export default Error503Page;
