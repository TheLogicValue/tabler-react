// @flow

import * as React from "react";

import type { Props as SiteHeaderProps } from "./SiteHeader.react";

type Props = {|
  +nav: React.Node,
  +headerProps: SiteHeaderProps,
|};

function PageSidebar({
  nav,
  headerProps
}: Props): React.Node {

  return (
    <div className="navbar navbar-vertical navbar-expand-lg navbar-dark">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-menu">
            <span className="navbar-toggler-icon"></span>
          </button>
          <h1 className="navbar-brand navbar-brand-autodark">
            <a href=".">
              <img src={headerProps.imageURL} width="110" height="32" alt="Tabler" className="navbar-brand-image"/>
            </a>
          </h1>
          {nav}
        </div>
      </div>
  );
}

PageSidebar.displayName = "Page.Sidebar";

export default PageSidebar;
