import * as React from "react";

import DefaultErrorPage from "./DefaultErrorPage.react";
import type { DefaultErrorPageProps } from "./DefaultErrorPage.react";

export type Error404PageProps = DefaultErrorPageProps;

function Error404Page({
  title = "404",
  subtitle = "Oops... You just found an error page...",
  details = "We are sorry but the page you have requested can not be found...",
  action,
}: Error404PageProps): React.ReactElement {
  return (
    <DefaultErrorPage
      title={title}
      subtitle={subtitle}
      details={details}
      action={action}
    />
  );
}

export default Error404Page;
