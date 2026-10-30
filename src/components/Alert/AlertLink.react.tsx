import SafeLink from "../../helpers/SafeLink.react";
import * as React from "react";
import cn from "classnames";

export type AlertLinkProps = {
  readonly children?: React.ReactNode;
  readonly className?: string;
  readonly href?: string;
};

/**
 * Renders a link that stands out more within Alerts
 */
function AlertLink({ children, className, href }: AlertLinkProps): React.ReactNode {
  const classes = cn(`alert-link`, className);
  return (
    <SafeLink className={classes} href={href}>
      {children}
    </SafeLink>
  );
}

AlertLink.displayName = "Alert.Link";

export default AlertLink;
