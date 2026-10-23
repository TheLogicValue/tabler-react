import * as React from "react";
import List from "../List";
import Icon from "../Icon";
import MediaBody from "./MediaBody.react";
import SocialNetworksList from "../SocialNetworksList";
import Tooltip from "../Tooltip";

export type MediaBodySocialProps = {
  readonly children?: React.ReactNode;
  /** Propiedad heredada que no se aplica al contenedor. */
  readonly className?: string;
  readonly name: string;
  readonly workTitle: string;
  readonly facebook?: string;
  readonly twitter?: string;
  readonly phone?: string;
  readonly skype?: string;
};

function MediaBodySocial({
  className,
  children,
  name,
  workTitle,
  facebook = "",
  twitter = "",
  phone = "",
  skype = "",
}: MediaBodySocialProps): React.ReactElement {
  let fbIcon;
  let twitterIcon;
  let phoneIcon;
  let skypeIcon;

  if (facebook) {
    fbIcon = (
      <List.Item inline>
        <Tooltip content="Facebook" placement="top">
          <a href="/Profile">
            <Icon prefix="fa" name="facebook" />
          </a>
        </Tooltip>
      </List.Item>
    );
  }

  if (twitter) {
    twitterIcon = (
      <List.Item inline>
        <Tooltip content="Twitter" placement="top">
          <a href="/Profile">
            <Icon prefix="fa" name="twitter" />
          </a>
        </Tooltip>
      </List.Item>
    );
  }

  if (phone) {
    phoneIcon = (
      <List.Item inline>
        <Tooltip content="+1 234-567-8901" placement="top">
          <a href="/Profile">
            <Icon prefix="fa" name="phone" />
          </a>
        </Tooltip>
      </List.Item>
    );
  }

  if (skype) {
    skypeIcon = (
      <List.Item inline>
        <Tooltip content="@skypename" placement="top">
          <a href="/Profile">
            <Icon prefix="fa" name="skype" />
          </a>
        </Tooltip>
      </List.Item>
    );
  }
  return (
    <MediaBody>
      <h4 className="m-0">{name}</h4>
      <p className="text-muted mb-0">{workTitle}</p>
      <SocialNetworksList className="mb-0 mt-2">
        {fbIcon}
        {twitterIcon}
        {phoneIcon}
        {skypeIcon}
      </SocialNetworksList>
      {children}
    </MediaBody>
  );
}

export default MediaBodySocial;

export type Props = MediaBodySocialProps;
