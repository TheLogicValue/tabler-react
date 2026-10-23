import * as React from "react";

import DefaultErrorPage from "./DefaultErrorPage.react";
import type { DefaultErrorPageProps } from "./DefaultErrorPage.react";

export type Error403PageProps = DefaultErrorPageProps;

function Error403Page({
  title = "403",
  subtitle = "Oops... You just found an error page...",
  details = "We are sorry but you do not have permission to access this page...",
  action,
}: Error403PageProps): React.ReactElement {
  return (
    <DefaultErrorPage
      title={title}
      subtitle={subtitle}
      details={details}
      action={action}
    />
  );
}

export default Error403Page;
