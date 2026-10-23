import * as React from "react";

export type SiteLogoProps = {
  readonly href?: string;
  readonly src?: string;
  readonly alt?: string;
};

const SiteLogo = (props: SiteLogoProps): React.ReactNode => (
  <a className="header-brand" href={props.href}>
    <img src={props.src} className="header-brand-img" alt={props.alt} />
  </a>
);

SiteLogo.displayName = "Site.Logo";

export default SiteLogo;
