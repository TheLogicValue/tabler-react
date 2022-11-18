// @flow

import * as React from "react";
import { Container, Site, Notification, AccountDropdown } from "../";
import type { Props as NotificationTrayProps } from "../Notification/NotificationTray.react";
import type { Props as AccountDropdownProps } from "../AccountDropdown/AccountDropdown.react";
import type { Props as SiteNavProps } from "./SiteNav.react";

export type Props = {|
  +children?: React.Node,
  /**
   * header alignment
   */
  +align?: string,
  /**
   * href attribute for the logo
   */
  +href?: string,
  /**
   * Logo image URL
   */
  +imageURL?: string,
  /**
   * Logo image URL
   */
  +darkImageURL?: string,
  /**
   * The logo alt attribute
   */
  +alt?: string,
  /**
   * Include a notifications tray
   */
  +notificationsTray?: NotificationTrayProps,
  +accountDropdown?: AccountDropdownProps,
  +navItems?: SiteNavProps,
  /**
   * Handle toggling/collapsing of the mobile menu when the collapse icon is clicked
   */
  +onMenuToggleClick?: () => void,
  +condensed: boolean,
  +options?: React.Node,
|};

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
  options,
}: Props): React.Node => {
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
              { condensed ? (
              <div className="d-flex order-lg-1">
                {nav}
              </div>
              ) : ""}              
              <div className="d-flex order-lg-1">
                {options}
              </div>             
              <div className="d-flex order-lg-2 ml-auto">
                {notificationsTray}
                {accountDropdown}
              </div>
              <a
                className="header-toggler d-lg-none ml-3 ml-lg-0"
                onClick={onMenuToggleClick}
              >
                <span className="header-toggler-icon" />
              </a>
            </React.Fragment>
          )}
        </div>
      </Container>
    </div>
  );
};

SiteHeader.displayName = "Site.Header";

export default SiteHeader;
