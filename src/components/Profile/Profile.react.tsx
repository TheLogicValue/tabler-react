import * as React from "react";
import cn from "classnames";

import Card from "../Card";
import Header from "../Header";
import SocialNetworksList from "../SocialNetworksList";

import ProfileImage from "./ProfileImage.react";

export type ProfileProps = {
  readonly children?: React.ReactNode;
  readonly className?: string;
  readonly name: string;
  readonly avatarURL?: string;
  /** Propiedad heredada sin efecto en la acción social fija. */
  readonly twitterURL?: string;
  readonly backgroundURL?: string;
  readonly bio?: string;
};

function Profile({
  className,
  children,
  name,
  avatarURL = "",
  twitterURL = "",
  backgroundURL = "",
  bio,
}: ProfileProps): React.ReactElement {
  const classes = cn("card-profile", className);
  return (
    <Card className={classes}>
      <Card.Header backgroundURL={backgroundURL} />
      <Card.Body className="text-center">
        <ProfileImage avatarURL={avatarURL} />
        <Header.H3 className="mb-3">{name}</Header.H3>
        <p className="mb-4">{bio || children}</p>
        <SocialNetworksList
          itemsObjects={[{ name: "twitter", label: "Follow" }]}
          prefix="fa"
          asButtons
        />
      </Card.Body>
    </Card>
  );
}

Profile.Image = ProfileImage;

export default Profile;

export type Props = ProfileProps;
