import SafeLink from "../../helpers/SafeLink.react";
import * as React from "react";

export type SiteLogoProps = {
  readonly href?: string;
  readonly src?: string;
  readonly alt?: string;
};

const SiteLogo = (props: SiteLogoProps): React.ReactNode => (
  <SafeLink className="header-brand" href={props.href}>
    <img src={props.src} className="header-brand-img" alt={props.alt} />
  </SafeLink>
);

SiteLogo.displayName = "Site.Logo";

export default SiteLogo;
