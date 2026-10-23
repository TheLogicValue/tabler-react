import * as React from "react";
import Container from "../Container.react";
import Site from "./Site.react";
import Notification from "../Notification";
import AccountDropdown from "../AccountDropdown";
import type { Props as NotificationTrayProps } from "../Notification/NotificationTray.react";
import type { Props as AccountDropdownProps } from "../AccountDropdown/AccountDropdown.react";
import type { Props as SiteNavProps } from "./SiteNav.react";

export type SiteHeaderProps = {
  readonly children?: React.ReactNode;
  /**
   * header alignment
   */
  readonly align?: string;
  /**
   * href attribute for the logo
   */
  readonly href?: string;
  /**
   * Logo image URL
   */
  readonly imageURL?: string;
  /**
   * Logo image URL
   */
  readonly darkImageURL?: string;
  /**
   * The logo alt attribute
   */
  readonly alt?: string;
  /**
   * Include a notifications tray
   */
  readonly notificationsTray?: NotificationTrayProps;
  readonly accountDropdown?: AccountDropdownProps;
  readonly navItems?: SiteNavProps;
  /**
   * Handle toggling/collapsing of the mobile menu when the collapse icon is clicked
   */
  readonly onMenuToggleClick?: () => void;
  readonly condensed?: boolean;
  readonly darkImageUrl?: string; 
};

/**
 * The very top header bar of your website, containing the logo and some optional
 * action components, such as a NotificationTray or an AccountDropdown on the right hand side
 */
const SiteHeader = ({
  children,
  href,
  align,
  imageURL,
  alt,
  notificationsTray: notificationsTrayFromProps,
  accountDropdown: accountDropdownFromProps,
  navItems,
  onMenuToggleClick,
  condensed,
}: SiteHeaderProps): React.ReactNode => {
  const notificationsTray =
    notificationsTrayFromProps &&
    React.createElement(Notification.Tray, notificationsTrayFromProps);

  const accountDropdown =
    accountDropdownFromProps &&
    React.createElement(AccountDropdown, accountDropdownFromProps);

  const nav = React.createElement(Site.Nav, navItems);

  const headerClasses = condensed ? "header sticky-top condensed" : "header";
  return (
    <div className={headerClasses}>
      <Container className={align}>
        <div className="d-flex">
          {children || (
            <React.Fragment>
              <Site.Logo href={href} alt={alt} src={imageURL} />
              {condensed ? (
                <div className="d-flex order-lg-1">
                  {nav}
                </div>
              ) : ""}
              <div className="d-flex order-lg-2 ml-auto">
                {notificationsTray}
                {accountDropdown}
              </div>
              <button
                type="button"
                className="tabler-action header-toggler d-lg-none ml-3 ml-lg-0"
                aria-label="Toggle navigation"
                onClick={onMenuToggleClick}
              >
                <span className="header-toggler-icon" aria-hidden="true" />
              </button>
            </React.Fragment>
          )}
        </div>
      </Container>
    </div>
  );
};

SiteHeader.displayName = "Site.Header";

export default SiteHeader;

export type Props = SiteHeaderProps;
