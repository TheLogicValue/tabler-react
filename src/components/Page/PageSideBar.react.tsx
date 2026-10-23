import * as React from "react";

/** Configuration actually read by Page.Sidebar; other legacy header fields are ignored. */
export type PageSidebarHeaderProps = {
  readonly darkImageUrl?: string;
  readonly [property: string]: unknown;
};

export type PageSidebarProps = {
  readonly nav: React.ReactNode;
  readonly headerProps: PageSidebarHeaderProps;
};

function PageSidebar({
  nav,
  headerProps
}: PageSidebarProps): React.ReactElement {

  return (
    <div className="navbar navbar-vertical navbar-expand-lg navbar-dark">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-menu">
            <span className="navbar-toggler-icon"></span>
          </button>
          <h1 className="navbar-brand navbar-brand-autodark">
            <a href=".">
              <img src={headerProps.darkImageUrl} width="120px" alt="Tabler" className="navbar-brand-image"/>
            </a>
          </h1>
          {nav}
        </div>
      </div>
  );
}

PageSidebar.displayName = "Page.Sidebar";

export default PageSidebar;
