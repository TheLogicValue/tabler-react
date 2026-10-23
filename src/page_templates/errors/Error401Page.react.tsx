import * as React from "react";

import DefaultErrorPage from "./DefaultErrorPage.react";
import type { DefaultErrorPageProps } from "./DefaultErrorPage.react";

export type Error401PageProps = DefaultErrorPageProps;

function Error401Page({
  title = "401",
  subtitle = "Oops... You just found an error page...",
  details = "We are sorry but you are not authorized to access this page...",
  action,
}: Error401PageProps): React.ReactElement {
  return (
    <DefaultErrorPage
      title={title}
      subtitle={subtitle}
      details={details}
      action={action}
    />
  );
}

export default Error401Page;
