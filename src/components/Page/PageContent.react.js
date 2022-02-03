// @flow

import * as React from "react";
import cn from "classnames";
import { Container } from "../";
import PageHeader from "./PageHeader.react";

type Props = {|
  +children?: React.Node,
  +className?: string,
  +title?: string,
  +subTitle?: string,
  +options?: React.Node,
  +back?: React.Node,
|};

function PageContent({
  className,
  children,
  title,
  subTitle,
  options,
  back,
}: Props): React.Node {
  const classes = cn("page-content", className);
  return (
    <div className={classes}>
      <Container>
        {(title || subTitle || options || back) && (
          <PageHeader title={title} subTitle={subTitle} options={options} back={back} />
        )}
        {children}
      </Container>
    </div>
  );
}

PageContent.displayName = "Page.Content";

export default PageContent;
