import * as React from "react";
import SiteHeader from "./SiteHeader.react";
import SiteFooter from "./SiteFooter.react";
import SiteNav from "./SiteNav.react";
import SiteLogo from "./SiteLogo.react";
import SiteWrapper from "./SiteWrapper.react";

export type SiteProps = {
  readonly children: React.ReactNode;
};

/**
 * Components for building the base of your website, such as a header, footer and nav bar
 */
function Site(props: SiteProps): React.ReactNode {
  return props.children;
}

Site.Header = SiteHeader;
Site.Footer = SiteFooter;
Site.Nav = SiteNav;
Site.Logo = SiteLogo;
Site.Wrapper = SiteWrapper;

Site.displayName = "Site";

/** @component */
export default Site;
