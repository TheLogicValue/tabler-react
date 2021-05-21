// @flow

import * as React from "react";

import { Page, Site } from "../";
import type { Props as SiteHeaderProps } from "./SiteHeader.react";
import type { Props as SiteNavProps } from "./SiteNav.react";
import type { Props as SiteFooterProps } from "./SiteFooter.react";

type Props = {|
  +headerProps: SiteHeaderProps,
  +navProps: SiteNavProps,
  +footerProps: SiteFooterProps,
  +children: React.Node,
  +routerContextComponentType?: React.ElementType,
  +condensed: boolean
|};

type State = {
  collapseMobileMenu: boolean,
};

class SiteWrapper extends React.PureComponent<Props, State> {
  static displayName = "Site.Wrapper";

  state = {
    collapseMobileMenu: true,
    width: window.innerWidth
  };

  handleCollapseMobileMenu = (): void => {
    this.setState(s => ({ collapseMobileMenu: !s.collapseMobileMenu }));
  };

  updateSize = (): void => {
    this.setState({ width: window.innerWidth });
  };

  render(): React.Node {
    const {
      headerProps,
      navProps,
      footerProps,
      children,
      routerContextComponentType,
      condensed = false,
      vertical = false
    }: Props = this.props;

    window.addEventListener('resize', this.updateSize);

    let verticalMode = vertical && this.state.width >= 992;

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
