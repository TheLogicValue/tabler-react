import * as React from "react";
import cn from "classnames";
import Container from "../Container.react";
import PageHeader from "./PageHeader.react";

export type PageContentProps = {
  readonly children?: React.ReactNode;
  readonly className?: string;
  readonly title?: string;
  readonly subTitle?: string;
  readonly options?: React.ReactNode;
  readonly back?: React.ReactNode;
};

function PageContent({
  className,
  children,
  title,
  subTitle,
  options,
  back,
}: PageContentProps): React.ReactElement {
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
