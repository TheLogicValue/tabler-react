import * as React from "react";
import cn from "classnames";
import PageMain from "./PageMain.react";
import PageContent from "./PageContent.react";
import PageHeader from "./PageHeader.react";
import PageContentWithSidebar from "./PageContentWithSidebar.react";
import PageCard from "./PageCard.react";
import PageTitle from "./PageTitle.react";
import PageMapHeader from "./PageMapHeader.react";
import PageSideBar from "./PageSideBar.react";

export type PageProps = {
  readonly children?: React.ReactNode;
  readonly className?: string;
};

function Page({ className, children }: PageProps): React.ReactElement {
  const classes = cn("page", className);
  return <div className={classes}>{children}</div>;
}

Page.Main = PageMain;
Page.Content = PageContent;
Page.Header = PageHeader;
Page.ContentWithSidebar = PageContentWithSidebar;
Page.Card = PageCard;
Page.Title = PageTitle;
Page.MapHeader = PageMapHeader;
Page.Sidebar = PageSideBar;

export default Page;
