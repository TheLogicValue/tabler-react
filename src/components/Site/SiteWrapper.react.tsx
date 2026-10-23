import * as React from "react";

import Page from "../Page";
import Site from "./Site.react";
import type { Props as SiteHeaderProps } from "./SiteHeader.react";
import type { Props as SiteNavProps } from "./SiteNav.react";
import type { Props as SiteFooterProps } from "./SiteFooter.react";

export type SiteWrapperProps = {
  readonly headerProps: SiteHeaderProps;
  readonly navProps: SiteNavProps;
  readonly footerProps: SiteFooterProps;
  readonly children: React.ReactNode;
  readonly routerContextComponentType?: SiteNavProps["routerContextComponentType"];
  readonly condensed?: boolean;
  readonly vertical?: boolean;
};

type SiteWrapperState = {
  collapseMobileMenu: boolean;
  width: number;
};

class SiteWrapper extends React.PureComponent<SiteWrapperProps, SiteWrapperState> {
  static displayName = "Site.Wrapper";

  state: SiteWrapperState = {
    collapseMobileMenu: true,
    width: window.innerWidth
  };

  componentDidMount(): void {
    window.addEventListener("resize", this.updateSize);
    this.updateSize();
  }

  componentWillUnmount(): void {
    window.removeEventListener("resize", this.updateSize);
  }

  handleCollapseMobileMenu = (): void => {
    this.setState(s => ({ collapseMobileMenu: !s.collapseMobileMenu }));
  };

  updateSize = (): void => {
    this.setState({ width: window.innerWidth });
  };

  render(): React.ReactNode {
    const {
      headerProps,
      navProps,
      footerProps,
      children,
      routerContextComponentType,
      condensed = false,
      vertical = false
    }: SiteWrapperProps = this.props;



    const verticalMode = vertical && this.state.width >= 992;

    const headerPropsWithToggleClick = {
      ...headerProps,
      onMenuToggleClick: this.handleCollapseMobileMenu,
      condensed: condensed,
      vertical: verticalMode
    };

    const header = React.createElement(Site.Header, headerPropsWithToggleClick);
    const navPropsWithCollapse = {
      ...navProps,
      collapse: this.state.collapseMobileMenu,
      routerContextComponentType: routerContextComponentType,
      condensed: condensed,
      vertical: verticalMode
    };
    const nav = React.createElement(Site.Nav, navPropsWithCollapse);
    const footer = React.createElement(Site.Footer, footerProps);

    if (verticalMode){
      return (
        <div className="wrapper">
          <Page.Sidebar headerProps={headerProps} nav={nav}/>
          <Page>
            <Page.Main>
              {children}
            </Page.Main>
            {footer}
          </Page>
        </div>
      );
    }else{
      return (
        <Page>
          <Page.Main>
            {header}
            {nav}
            {children}
          </Page.Main>
          {footer}
        </Page>
      );
    }
  }
}

export default SiteWrapper;
